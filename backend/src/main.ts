import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  config();
  const swaggerConf = new DocumentBuilder()
    .setTitle('Covid tracker')
    .setDescription('A Covid-Tracker API-jának dokumentációja swagger segítségével.')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup(process.env.SWAGGER_LINK, app, swaggerDoc);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
