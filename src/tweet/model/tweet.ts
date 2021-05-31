import Prisma from '.prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tweet implements Partial<Prisma.Tweet> {
  @Field()
  id: number;

  @Field()
  content: string;
}
