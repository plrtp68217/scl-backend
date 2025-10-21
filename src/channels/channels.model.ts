import { 
  Column, 
  DataType, 
  BelongsToMany , 
  Table, 
  Model } from "sequelize-typescript";

import { User } from "src/users/users.model";
import { UserChannel } from "./users-channels.model";

interface ChannelCreationAttrs {
  channelId: string
}

@Table({
  tableName: 'channels',
  timestamps: false,
})
export class Channel extends Model<Channel, ChannelCreationAttrs> {

  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  declare id: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare channelLink: string

  @Column({type: DataType.INTEGER, allowNull: true})
  declare reward: number;

  @Column({type: DataType.STRING, allowNull: true})
  declare title: string;

  @Column({type: DataType.STRING, allowNull: true})
  declare description: string;

  @BelongsToMany(() => User, () => UserChannel)
  declare users: User[];
}