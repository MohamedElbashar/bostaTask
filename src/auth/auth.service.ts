import Prisma from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from 'src/core/constant';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ token: string; user: Prisma.User }> {
    const user = await this.prisma.user.findFirst({ where: { username } });

    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return null;

    const token = jwt.sign({ username, id: user.id }, jwtSecret, {
      expiresIn: '60m',
    });

    return { token, user };
  }

  async register(username: string, password: string): Promise<Prisma.User> {
    const exist = await this.prisma.user.findFirst({ where: { username } });

    if (exist) {
      throw new Error('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: { username, password: hashedPassword },
    });

    return user;
  }
}
