import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { PrismaService } from '../prisma/prisma.service';
import { TweetResolver } from '../tweet/tweet.resolver';
@Module({
  providers: [TweetService, PrismaService, TweetResolver],
})
export class TweetModule {}
