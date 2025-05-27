import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { setupSwagger } from './swagger';

const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';

export async function bootstrap() {
  console.log('Application starting...');
  const app = await NestFactory.create(AppModule);

  // Подключение middleware логирования
  app.use(new LoggerMiddleware().use);

  // Подключение фильтра исключений
  app.useGlobalFilters(new HttpExceptionFilter());

  // Подключение Swagger
  setupSwagger(app);

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
