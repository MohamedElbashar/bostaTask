import { PrismaService } from 'src/prisma/prisma.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Tweet } from './dto/input/tweet.input';
import { TweetService } from './tweet.service';
import { GraphQLObjectType } from 'graphql';
import { Res } from './dto/shared/responseTye';
@Resolver(Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Mutation(() => Res, { nullable: true })
  async addTweet(@Args() tweetContent: Tweet): Promise<Res | null> {
    await this.tweetService.addTweet(tweetContent, 1);
    return { success: true };
  }
}
