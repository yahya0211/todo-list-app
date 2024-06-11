import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
