import { IsOptional, IsString, IsEnum, IsDateString, IsInt, Min } from 'class-validator';
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client'; // optional if you want role-based filtering



export class GetSubscriptionsFilterDto {
  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan;

  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsDateString()
  startDateFrom?: string; 

  @IsOptional()
  @IsDateString()
  startDateTo?: string; 

  @IsOptional()
  @IsDateString()
  endDateFrom?: string; 

  @IsOptional()
  @IsDateString()
  endDateTo?: string; 

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
