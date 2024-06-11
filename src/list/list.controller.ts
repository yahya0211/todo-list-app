import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async addList(@Body() dto: CreateListDto, @Request() req) {
    dto.todoId = req.user.id;
    console.log(dto.todoId);

    return this.listService.createList(dto);
  }

  @Get()
  async findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.listService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.listService.remove(id);
  }
}
