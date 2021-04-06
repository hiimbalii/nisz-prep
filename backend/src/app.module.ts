import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME || 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'test',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    UsersModule,
    PlacesModule,
    PermissionsModule,
  ],
})
export class AppModule {}
