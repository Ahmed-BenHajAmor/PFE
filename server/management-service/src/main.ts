import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';  // <-- add this at the top

import { ExtractUserMiddleware } from './middlewares/user-object.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // <-- add this
  app.use(express.urlencoded({ extended: true }));
  app.use(new ExtractUserMiddleware().use);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove extra properties
    forbidNonWhitelisted: true, // throw error on extra properties
    transform: true, // automatically transform payloads to DTO instances
  }));

  await app.listen(env.PORT ?? 8080);
}
bootstrap();
