import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddTweet } from './dto/input/tweet.input';
import { TweetService } from './tweet.service';
import { Res } from './dto/shared/responseType';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/guard/auth.guard';
import { User } from 'src/users/decorators/getUserId.decorator';
import { Tweet } from './model/tweet';
import { ErrorResponse } from 'src/users/dto/shared/errorResponse';
@Resolver(Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  @UseGuards(AuthGuard)
  async addTweet(
    @User() user,
    @Args('createTweet') createTweet: AddTweet,
  ): Promise<object[] | null> {
    console.log('hi resolver');
    return await this.tweetService.addTweet(createTweet, user.id);
  }
}
