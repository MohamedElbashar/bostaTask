import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class Tweet {
  @Field()
  content: string;
}
