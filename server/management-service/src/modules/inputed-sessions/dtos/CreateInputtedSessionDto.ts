import { Season, SoundActivity, SoundEnvironment, SoundMood } from '@prisma/client';
import { IsString, IsInt, IsOptional, IsDateString, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';

export class CreateInputtedSessionDto {

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsDateString()
  date: string;

  @IsString()
  prompt: string;

  @IsInt()
  chosenDuration: number;

  @IsString()
  timeOfDay: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(SoundMood, { each: true })
  mood: SoundMood[];

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(SoundActivity, { each: true })
  activity: SoundActivity[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(SoundEnvironment, { each: true })
  environment?: SoundEnvironment[];

  @IsInt()
  temperature: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Season, { each: true })
  season: Season[];

  @IsString()
  temperatureUnit: string;
}
