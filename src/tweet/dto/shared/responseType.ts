import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Res {
  @Field()
  success: boolean;
}
