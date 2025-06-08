import { Model } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

@Table({
  tableName: 'records',
  timestamps: false,
})
export class Record extends Model {
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @Column({type: DataType.STRING})
  gameId: string;

  @Column({type: DataType.INTEGER})
  score: number;

  @BelongsTo(() => User)
  user: User;
}