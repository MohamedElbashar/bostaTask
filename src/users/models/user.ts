import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  userId: string;

  @Field()
  password: string;
}
