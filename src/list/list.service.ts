import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { todo } from 'node:test';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async createList(dto: CreateListDto) {
    return await this.prisma.todo.create({
      data: {
        ...dto,
        status: false,
      },
    });
  }

  async findAll() {
    return await this.prisma.todo.findMany({
      select: {
        id: true,
        todoId: true,
        title: true,
        date: true,
        subject: true,
        status: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.todo.findFirst({
      where: {
        id,
      },
    });
  }

  async findListUser(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        todo: true,
      },
    });
  }

  async update(id: string, updateListDto: UpdateListDto) {
    return await this.prisma.todo.update({
      where: { id: id },
      data: {
        status: updateListDto.status,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.todo.deleteMany({
      where: { id: id },
    });
  }
}
