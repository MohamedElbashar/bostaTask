import Prisma from '.prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User implements Partial<Prisma.User> {
  @Field()
  username: string;

  @Field()
  password: string;
}
