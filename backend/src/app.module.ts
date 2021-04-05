import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { PermissionsModule } from './permissions/permissions.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.COVID_HOSTNAME,
      port: 3306,
      username: process.env.COVID_USERNAME,
      password: process.env.COVID_PASSWORD,
      database: process.env.COVID_DB_NAME,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    PlacesModule,
    PermissionsModule,
  ],
})
export class AppModule {}
