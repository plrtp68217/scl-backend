import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Channel } from './channels.model';


interface UserChannelCreationAttrs {
  userId: number;
  channelId: string;
  subscribedAt?: Date;
}

@Table({
  tableName: 'user_channel',
  timestamps: false,
})
export class UserChannel extends Model<UserChannel, UserChannelCreationAttrs> {
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare userId: number;

  @ForeignKey(() => Channel)
  @Column({type: DataType.STRING, allowNull: false})
  declare channelId: string;

  @Column({type: DataType.DATE, defaultValue: DataType.NOW})
  declare subscribedAt: Date;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Channel)
  declare channel: Channel;
}