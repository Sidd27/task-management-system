import pool from "../config/db.js";

export const createTask = async (userId, title, description) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
      [userId, title, description]
    );
    // Fetch the newly created task using the insertId
    const [newTask] = await connection.query(
      `SELECT * FROM tasks WHERE id = ?`,
      [result.insertId]
    );

    return newTask[0] || null; // Return the new task or null if not found
  } finally {
    connection.release();
  }
};

export const getUserTasks = async (userId) => {
  const connection = await pool.getConnection();
  try {
    const [tasks] = await connection.query(
      "SELECT * FROM tasks WHERE user_id = ?",
      [userId]
    );
    // Return the user where id matches
    return tasks;
  } finally {
    connection.release();
  }
};

export const updateTaskById = async (userId, taskId, updates) => {
  const updateKeys = Object.keys(updates);
  if (updateKeys.length === 0) return false;

  const setClause = updateKeys.map((key) => `${key} = ?`).join(", ");
  const values = updateKeys.map((key) => updates[key]);

  const connection = await pool.getConnection();
  try {
    // Perform the update
    const [updateResult] = await connection.query(
      `UPDATE tasks SET ${setClause} WHERE id = ? AND user_id = ?`,
      [...values, taskId, userId]
    );

    // Check if the update was successful
    if (updateResult.affectedRows === 0) return null;

    // Retrieve the updated task
    const [updatedTask] = await connection.query(
      `SELECT * FROM tasks WHERE id = ? AND user_id = ?`,
      [taskId, userId]
    );

    return updatedTask[0] || null; // Return the updated task or null if not found
  } catch (error) {
    console.log(error);
  } finally {
    connection.release();
  }
};

export const deleteTaskById = async (userId, taskId) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );
    // Check if any row was deleted
    if (result.affectedRows > 0) {
      return taskId; // Return the ID of the deleted task
    }
    return null; // No task was deleted
  } finally {
    connection.release();
  }
};
