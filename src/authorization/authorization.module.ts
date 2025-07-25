import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [
    UsersModule
  ]
})
export class AuthorizationModule {}
