// src/models/index.ts
import { Sequelize } from 'sequelize-typescript';
import { User } from './user';
import { Task } from './task';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  models: [User, Task], // Ensure all your models are listed here
});

// Optionally sync here if you prefer:
// sequelize.sync({ alter: true }).then(() => console.log('Database synced'));
