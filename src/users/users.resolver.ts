import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { User } from './models/user';
import { UsersService } from './users.service';
import { SignUpInput } from './dto/input/signup.input';
import { ErrorResponse } from './dto/shared/errorResponse';
import { LoginInput } from './dto/input/login.input';
import { MyContext } from 'src/types/myContext';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<object[] | null> {
    return this.userService.signUp(signUpInput);
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext,
  ): Promise<object[] | null> {
    return this.userService.login(loginInput, ctx.req);
  }

  @Mutation(() => Boolean)
  async logOut(@Context() ctx: MyContext) {
    this.userService.logout(ctx);
  }
}
