import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByUsername } from "../models/userModel.js";

export const registerController = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(name, username, hashedPassword);

    // Generate JWT token for the new user
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "5h", // Token expires in 1 hour
    });

    res.json({ message: "User registered", token, user: { name, username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const { id, name } = user;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.json({
      token,
      user: {
        name,
        username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getUserById(userId);

    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
};
