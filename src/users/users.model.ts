import { Column, DataType, HasMany, Table, Model } from "sequelize-typescript";
import { Record } from "src/records/records.model";

interface UserCreationAttrs {
  userId: number,
}

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, allowNull: false})
  userId: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  balance: number;

  @HasMany(() => Record)
  records: Record[];
}