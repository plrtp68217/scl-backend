import { 
  Column,
  DataType,
  HasMany,
  BelongsToMany, 
  Table, 
  Model } from "sequelize-typescript";
import { Record } from "src/records/records.model";
import { Channel } from "src/channels/channels.model";
import { UserChannel } from "src/channels/users-channels.model";

interface UserCreationAttrs {
  userId: number,
  name: string,
}

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: false})
  declare userId: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare name: string;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  declare balance: number;

  @HasMany(() => Record, 'userId')
  declare records: Record[];

  @BelongsToMany(() => Channel, () => UserChannel)
  declare channels: Channel[];
}