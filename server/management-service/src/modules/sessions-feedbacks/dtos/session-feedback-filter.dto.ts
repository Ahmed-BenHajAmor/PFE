import { IsOptional, IsUUID, IsString, IsDateString, IsInt, Min } from 'class-validator';

export class SessionFeedbackFilterDto {
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @IsOptional()
  @IsString()
  feeling?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  createdAtMin?: string; 

  @IsOptional()
  @IsDateString()
  createdAtMax?: string;

  // Pagination
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
