import { SoundStatus } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateSoundDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  totalDuration: number;

  @IsString()
  @IsNotEmpty()
  status: SoundStatus;

  @IsUrl()
  url: string;

}
