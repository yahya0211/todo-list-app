import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto): Promise<{ accessToken: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found!');
    }

    const isMatchPassword = await bcrypt.compare(
      dto.password,
      existingUser.password,
    );

    if (!isMatchPassword) {
      throw new Error("Password doesn't match");
    }

    const payload = {
      username: existingUser.username,
      id: existingUser.id,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: CreateUserDto) {
    const { username } = dto;
    const existingUser = await this.prisma.user.findFirst({
      where: { username },
    });
    if (existingUser) {
      throw new Error('User already register');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
      },
    });
  }
}
