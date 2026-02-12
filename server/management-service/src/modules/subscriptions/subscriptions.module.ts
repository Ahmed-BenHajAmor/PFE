import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionMapper } from './mappers/subcription.mapper';

@Module({
  imports: [SubscriptionMapper],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, PrismaService]
})
export class SubscriptionsModule {}
