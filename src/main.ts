import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { SESSION_SECRET } from './common/constants/index';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'task',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expired: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
