import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/input/signup.input';
import * as bcrypt from 'bcrypt';
import { ErrorResponse } from './dto/shared/errorResponse';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(signUpInput: SignUpInput): Promise<ErrorResponse[] | null> {
    const exist = this.prisma.user.findFirst({
      where: { username: signUpInput.username },
    });

    if (exist) {
      return [
        {
          path: 'username',
          message: 'Invalid user name or password',
        },
      ];
    }

    const hashedPassword = await bcrypt.hash(signUpInput.password, 12);
    await this.prisma.user.create({
      data: { username: signUpInput.username, password: hashedPassword },
    });
    return null;
  }
}
