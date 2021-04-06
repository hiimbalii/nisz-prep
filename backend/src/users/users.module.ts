import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

config();

@Module({
  controllers: [UsersController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'niszIsTheBest123',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || 3600000 },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UsersService, UserRepository, JwtStrategy],
  exports: [UsersModule],
})
export class UsersModule {}
