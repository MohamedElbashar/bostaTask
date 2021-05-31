import { Injectable } from '@nestjs/common';
import { Int } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { errorMessage } from 'src/users/dto/shared/errorMessage';
import { ErrorResponse } from 'src/users/dto/shared/errorResponse';
import { AddTweet } from './dto/input/tweet.input';

@Injectable()
export class TweetService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTweets(
    tweet: AddTweet,
    user_id: number,
  ): Promise<ErrorResponse[] | null> {
    console.log('hi tweet');
    const createdTweet = await this.prisma.tweet.create({
      data: { content: tweet.content, userId: user_id },
    });
    if (!createdTweet)
      return errorMessage('username', 'Invalid username or password');
  }

  async addTweet(
    tweet: AddTweet,
    user_id: number,
  ): Promise<ErrorResponse[] | null> {
    console.log('hi tweet');
    const createdTweet = await this.prisma.tweet.create({
      data: { content: tweet.content, userId: user_id },
    });
    if (!createdTweet)
      return errorMessage('username', 'Invalid username or password');
  }
}
