import { Injectable } from '@nestjs/common';
import { Int } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tweet } from './dto/input/tweet.input';

@Injectable()
export class TweetService {
  constructor(private readonly prisma: PrismaService) {}

  async addTweet(tweet: Tweet, userId: number): Promise<any> {
    const createTweet = await this.prisma.tweet.create({
      data: { content: tweet.content, userId: userId },
    });

    return createTweet;
  }
}
