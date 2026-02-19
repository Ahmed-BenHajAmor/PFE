import { SoundStatus, SoundMood, SoundActivity, SoundEnvironment, Season } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, Min, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class GetSoundsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(SoundStatus)
  status?: SoundStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minDuration?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxDuration?: number;

  @IsOptional()
  @Type(() => Date)
  createdAtMin?: Date;

  @IsOptional()
  @Type(() => Date)
  createdAtMax?: Date;

  // Array filters
  @IsOptional()
  @IsEnum(SoundMood, { each: true })
  @IsArray()
  mood?: SoundMood[];

  @IsOptional()
  @IsEnum(SoundActivity, { each: true })
  @IsArray()
  activity?: SoundActivity[];

  @IsOptional()
  @IsEnum(SoundEnvironment, { each: true })
  @IsArray()
  environment?: SoundEnvironment[];

  @IsOptional()
  @IsEnum(Season, { each: true })
  @IsArray()
  season?: Season[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
