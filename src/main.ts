import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseService } from './shared/firebase/firebase.service';
import * as dotenv from 'dotenv'
import { ValidationPipe } from '@nestjs/common';

dotenv.config()
const firebaseService = new FirebaseService;
firebaseService.connect();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
