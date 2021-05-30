import { PrismaService } from 'src/prisma/prisma.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
// import { GetUserArgs } from './dto/args/get-user.args';
// import { GetUsersArgs } from './dto/args/get-users.args';
// import { CreateUserInput } from './dto/input/create-user.input';
// import { DeleteUserInput } from './dto/input/delete-user.input';
// import { UpdateUserInput } from './dto/input/update-user.input';

import { User } from './models/user';
import { UsersService } from './users.service';
import { SignUpInput } from './dto/input/signup.input';
import { Prisma } from '.prisma/client';
import { ErrorResponse } from './dto/shared/errorResponse';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<object[] | null> {
    return this.userService.signup(signUpInput);
  }
}
