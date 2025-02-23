// backend/src/controllers/tasks.controller.ts
import { Request, Response } from 'express';
import { Task } from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // Provided by auth middleware
    const tasks = await Task.findAll({ where: { userId } });
    res.json(tasks);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!req.userId) return res.status(401).json({ error: 'Unauthorized' });
    const task = await Task.create({ title, description, userId: req.userId });
    res.status(201).json(task);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, isComplete } = req.body;
    const { id } = req.params;
    const userId = req.userId;
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });

    task.title = title;
    task.description = description;
    task.isComplete = isComplete;
    await task.save();
    res.json(task);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });
    
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
