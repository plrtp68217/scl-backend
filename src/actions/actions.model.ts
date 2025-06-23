import { Model, Column, DataType, Table } from "sequelize-typescript";

interface ActionCreationAttrs {
  name: string,
  action: string,
  date: Date
}

@Table({
  tableName: 'actions',
  timestamps: false,
})
export class Action extends Model<Action, ActionCreationAttrs> {
  @Column({type: DataType.STRING, allowNull: false})
  declare name: string;

  @Column({type: DataType.STRING, allowNull: false})
  declare action: string;

  @Column({type: DataType.DATE, allowNull: false})
  declare date: Date;
}