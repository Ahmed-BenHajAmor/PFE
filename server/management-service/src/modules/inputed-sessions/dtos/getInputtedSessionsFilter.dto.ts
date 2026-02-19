import {
  IsOptional,
  IsString,
  IsInt,
  IsDateString,
  Min,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetInputtedSessionsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  timeOfDay?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  mood?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  activity?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  environment?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minDuration?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxDuration?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  season?: string[];

  @IsOptional()
  @IsDateString()
  createdAtMin?: string;

  @IsOptional()
  @IsDateString()
  createdAtMax?: string;

  @IsOptional()
  @IsString()
  userId?: string;

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
