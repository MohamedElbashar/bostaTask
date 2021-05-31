import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../models/user';

@InputType({ description: 'Login Inputs' })
export class LoginInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  password: string;
}
