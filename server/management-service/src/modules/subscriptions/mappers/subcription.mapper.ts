import { Prisma } from '@prisma/client';
import { CreateSubscriptionDto } from '../dtos/create-subscription.dto';

export class SubscriptionMapper {
  static fromCreateDto(userId : string, dto: CreateSubscriptionDto): Prisma.SubscriptionCreateInput {
    return {
      plan: dto.plan,
      status: dto.status,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      user: { connect: { id: userId } },
    };
  }
}
