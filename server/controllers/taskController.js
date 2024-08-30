import {
  createTask,
  getUserTasks,
  updateTaskById,
  deleteTaskById,
} from "../models/taskModel.js";

export const createTaskController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const task = await createTask(userId, title, description);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating task" });
  }
};

export const getTasksController = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await getUserTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.id;

    // Create an object to store the fields that need to be updated
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const updated = await updateTaskById(userId, id, updateFields);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedTaskId = await deleteTaskById(userId, id);
    if (deletedTaskId) {
      res.json({ message: "Task deleted", id: deletedTaskId });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting task" });
  }
};
