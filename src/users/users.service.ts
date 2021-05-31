import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/input/signup.input';
import * as bcrypt from 'bcrypt';
import { ErrorResponse } from './dto/shared/errorResponse';
import { errorMessage } from './dto/shared/errorMessage';
import { LoginInput } from './dto/input/login.input';
import { Request } from 'express';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(signUpInput: SignUpInput): Promise<ErrorResponse[] | null> {
    const exist = this.prisma.user.findUnique({
      where: { username: signUpInput.username },
    });
    if (exist) {
      return [
        {
          path: 'username',
          message: 'Invalid username or password',
        },
      ];
    }

    const hashedPassword = await bcrypt.hash(signUpInput.password, 12);
    await this.prisma.user.create({
      data: { username: signUpInput.username, password: hashedPassword },
    });
    return null;
  }

  async login(
    loginInput: LoginInput,
    req: Request,
  ): Promise<ErrorResponse[] | null> {
    const user = await this.prisma.user.findFirst({
      where: { username: loginInput.username },
    });
    if (!user) return errorMessage('username', 'Invalid username or password');

    const valid = await bcrypt.compare(loginInput.password, user.password);
    if (!valid) return errorMessage('username', 'Invalid username or password');
    return null;

    // req.session.userId = user.id;
  }
}
