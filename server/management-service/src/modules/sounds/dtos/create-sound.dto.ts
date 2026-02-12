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

  @IsOptional()
  @IsString()
  timeOfDay: string;

  @IsOptional()
  @IsString()
  mood: string;

  @IsOptional()
  @IsString()
  activity: string;

  @IsOptional()
  @IsString()
  environment: string;

  @IsOptional()
  @IsInt()
  temperature: number;

  @IsOptional()
  @IsString()
  temperatureUnit: string;

  @IsOptional()
  @IsString()
  Season: string;

  @IsOptional()
  @IsInt()
  numberOfDownloads: number = 0; 
}
