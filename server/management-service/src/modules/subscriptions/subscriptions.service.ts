import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetSubscriptionsFilterDto } from './dtos/subscription-filter.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubscriptionsService {

    constructor(private prismaService : PrismaService) {}

    async getSubscriptions(filter: GetSubscriptionsFilterDto) {
    const {
      plan,
      status,
      userId,
      startDateFrom,
      startDateTo,
      endDateFrom,
      endDateTo,
      page = 1,
      limit = 10,
    } = filter;

    const where: Prisma.SubscriptionWhereInput = {
      ...(plan && { plan }),
      ...(status && { status }),
      ...(userId && { userId }),
      ...((startDateFrom || startDateTo) && {
        startDate: {
          ...(startDateFrom && { gte: new Date(startDateFrom) }),
          ...(startDateTo && { lte: new Date(startDateTo) }),
        },
      }),
      ...((endDateFrom || endDateTo) && {
        endDate: {
          ...(endDateFrom && { gte: new Date(endDateFrom) }),
          ...(endDateTo && { lte: new Date(endDateTo) }),
        },
      }),
    };


    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prismaService.subscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: 'desc' },
      }),
      this.prismaService.subscription.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async subscribeUser(userId : string, subscription:Prisma.SubscriptionCreateInput) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prismaService.subscription.create({
      data: subscription
    });
  }
}

