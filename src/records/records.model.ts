import { BelongsTo, Column, DataType, ForeignKey, Table, Model } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface RecordCreationAttrs {
  userId: number;
  gameId: string;
}

@Table({
  tableName: 'records',
  timestamps: false,
})
export class Record extends Model<Record, RecordCreationAttrs> {
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare userId: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare gameId: string;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  declare score: number;

  @BelongsTo(() => User)
  declare user: User;
}