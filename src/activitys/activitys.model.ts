import { 
  Column, 
  DataType, 
  Table,
  Model,
  ForeignKey,
  BelongsTo, } from "sequelize-typescript";

import { User } from "src/users/users.model";

interface ActivityCreationAttrs {
  userId: number;
}

@Table({
  tableName: 'activitys',
  timestamps: false,
})
export class Activity extends Model<Activity, ActivityCreationAttrs> {

  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.BIGINT, allowNull: false})
  declare userId: number

  @Column({type: DataType.INTEGER, defaultValue: 5})
  declare reward: number;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  declare isRewarded: boolean;

  @Column({type: DataType.DATE, defaultValue: DataType.NOW})
  declare lastEntry: Date;

  @Column({type: DataType.INTEGER, defaultValue: 1})
  declare streak: number;

  @BelongsTo(() => User)
  user: User;
}