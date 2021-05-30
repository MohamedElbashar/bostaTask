import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tweet {
  @Field()
  content: string;
}
