import { Season, SoundActivity, SoundEnvironment, SoundMood, SoundStatus } from '@prisma/client';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min } from 'class-validator';

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
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(SoundMood, { each: true })
  mood: SoundMood[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(SoundActivity, { each: true })
  activity: SoundActivity[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(SoundEnvironment, { each: true })
  environment: SoundEnvironment[];

  @IsOptional()
  @IsInt()
  temperature: number;

  @IsOptional()
  @IsString()
  temperatureUnit: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(Season, { each: true })
  season: Season[];

  @IsOptional()
  @IsInt()
  numberOfDownloads: number = 0; 
}
