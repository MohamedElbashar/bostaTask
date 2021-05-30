import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    TweetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
