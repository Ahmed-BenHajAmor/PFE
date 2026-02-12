import { SoundStatus } from '@prisma/client';
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
  mood?: string;

  @IsOptional()
  @IsString()
  activity?: string;

  @IsOptional()
  @IsString()
  environment?: string;

  @IsOptional()
  @IsInt()
  temperature?: number;

  @IsOptional()
  @IsString()
  temperatureUnit?: string;

  @IsOptional()
  @IsString()
  Season?: string;

  @IsOptional()
  @IsInt()
  numberOfDownloads?: number;
}
