import { Season, Sound, SoundActivity, SoundEnvironment, SoundMood, SoundStatus } from '@prisma/client';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class UpdateSoundDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalDuration?: number;

  @IsOptional()
  @IsEnum(SoundStatus)
  status?: SoundStatus;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  timeOfDay?: string;

  @IsOptional()
  @IsString()
  mood?: SoundMood[];

  @IsOptional()
  @IsString()
  activity?: SoundActivity[];

  @IsOptional()
  @IsString()
  environment?: SoundEnvironment[];

  @IsOptional()
  @IsInt()
  temperature?: number;

  @IsOptional()
  @IsString()
  temperatureUnit?: string;

  @IsOptional()
  @IsString()
  season?: Season[];

  @IsOptional()
  @IsInt()
  numberOfDownloads?: number;
}
