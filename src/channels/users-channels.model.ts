import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Channel } from './channels.model';


interface UserChannelCreationAttrs {
  userId: number;
  channelId: number;
  subscribedAt?: Date;
}

@Table({
  tableName: 'user_channel',
  timestamps: false,
})
export class UserChannel extends Model<UserChannel, UserChannelCreationAttrs> {
  @ForeignKey(() => User)
  @Column({type: DataType.BIGINT, allowNull: false})
  declare userId: number;

  @ForeignKey(() => Channel)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare channelId: number; // ← ссылается на Channel.id

  @Column({type: DataType.DATE, defaultValue: DataType.NOW})
  declare subscribedAt: Date;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Channel)
  declare channel: Channel;
}