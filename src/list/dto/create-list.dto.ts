import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  subject: string;

  status: boolean;

  todoId: string
}
