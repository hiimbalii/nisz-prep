import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

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
  ],
})
export class AppModule {}
