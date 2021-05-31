import { Field, InputType } from '@nestjs/graphql';
import { Tweet } from '../../model/tweet';
@InputType({ description: 'Tweet Inputs' })
export class AddTweet implements Partial<Tweet> {
  @Field()
  content: string;
}
