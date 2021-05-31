import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/input/signup.input';
import * as bcrypt from 'bcrypt';
import { ErrorResponse } from './dto/shared/errorResponse';
import { LoginInput } from './dto/input/login.input';
import { Request } from 'express';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(signUpInput: SignUpInput): Promise<ErrorResponse[] | null> {
    const exist = this.prisma.user.findFirst({
      where: { username: signUpInput.username },
    });

    if (exist) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(signUpInput.password, 12);
    await this.prisma.user.create({
      data: { username: signUpInput.username, password: hashedPassword },
    });
    return null;
  }

  async login(loginInput: LoginInput, req: Request): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { username: loginInput.username },
    });
    if (!user) return null;

    const valid = await bcrypt.compare(loginInput.password, user.password);
    if (!valid) return null;

    req.session.userId = user.id;
  }
}
