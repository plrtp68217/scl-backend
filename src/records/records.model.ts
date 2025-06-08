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
  @Column({type: DataType.INTEGER, allowNull: false,
    references: {model: 'users', key: 'userId'}
  })
  userId: number;

  @Column({type: DataType.STRING, allowNull: false})
  gameId: string;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  score: number;

  @BelongsTo(() => User)
  user: User;
}