import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export async function bootstrap() {
  console.log('Application starting...');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
