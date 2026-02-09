import { SoundStatus } from '@prisma/client';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  IsEnum,
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
}
