import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../models/user';

@InputType({ description: 'New User data' })
export class SignUpInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  password: string;
}
