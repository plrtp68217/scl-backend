import { Column, DataType, HasMany, Table, Model } from "sequelize-typescript";
import { Record } from "src/records/records.model";

interface UserCreationAttrs {
  userId: number,
  name: string,
}

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, allowNull: false})
  declare userId: number;

  @Column({type: DataType.STRING, allowNull: false})
  declare name: string;

  @Column({type: DataType.INTEGER, defaultValue: 0})
  declare balance: number;

  @HasMany(() => Record)
  declare records: Record[];
}