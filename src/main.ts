import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SESSION_SECRET } from './core/constant';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'task',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' },
    }),
  );
  await app.listen(3000);
}
bootstrap();
