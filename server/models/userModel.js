import pool from "../config/db.js";

export const createUser = async (name, username, hashedPassword) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `INSERT INTO users (name, username, password) VALUES (?, ?, ?)`,
      [name, username, hashedPassword]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
};

export const getUserByUsername = async (username) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    return rows[0];
  } finally {
    connection.release();
  }
};

export const getUserById = async (id) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  } finally {
    connection.release();
  }
};
