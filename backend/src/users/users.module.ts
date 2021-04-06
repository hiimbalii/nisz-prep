import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  imports: [PassportModule],
  providers: [UsersService, UserRepository],
  exports: [UsersModule],
})
export class UsersModule {}
