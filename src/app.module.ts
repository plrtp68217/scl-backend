import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";

import { User } from "./users/users.model";
import { RecordsModule } from './records/records.module';
import { Record } from "./records/records.model";
import { AuthorizationModule } from './authorization/authorization.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Record],
      autoLoadModels: true,
    }),
    UsersModule,
    RecordsModule,
    AuthorizationModule,
    ActionsModule,
  ],
})
export class AppModule {

}