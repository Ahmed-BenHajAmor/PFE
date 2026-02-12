import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class loginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
