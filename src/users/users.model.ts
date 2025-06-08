import { Column, DataType, HasMany, Table, Model } from "sequelize-typescript";
import { Record } from "src/records/records.model";

interface UserCreationAttrs {
  user_id: number,
}

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true})
  userId: number;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  balance: number;

  @HasMany(() => Record)
  records: Record[];
}