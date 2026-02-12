import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';
import { IsString, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';



export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsEnum(SubscriptionPlan)
  plan: SubscriptionPlan;

  @IsNotEmpty()
  @IsEnum(SubscriptionStatus)
  status: SubscriptionStatus;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
