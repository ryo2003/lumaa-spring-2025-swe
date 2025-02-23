// backend/src/models/task.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';
import { Optional } from 'sequelize';

// Define the attributes for Task
export interface TaskAttributes {
  id?: number;
  title: string;
  description?: string;
  isComplete?: boolean;
  userId: number;
}

// Define the attributes needed for creating a Task.
// We'll make 'id' and 'isComplete' optional because they are auto-generated or have default values.
export type TaskCreationAttributes = Optional<TaskAttributes, 'id' | 'isComplete'>;

@Table({ tableName: 'tasks' })
export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isComplete!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
