// backend/src/models/user.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes> implements UserAttributes {
  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;
}
