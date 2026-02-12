import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Role } from '@prisma/client';
import { RolesGuard } from '../users/guard/role.guard';
import { Roles } from '../users/decorators/role.decorator';
import { GetSubscriptionsFilterDto } from './dtos/subscription-filter.dto';
import { User } from '../users/decorators/user.decorator';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { SubscriptionMapper } from './mappers/subcription.mapper';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private subscriptionsService : SubscriptionsService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    getSubscriptions(@Query() filter : GetSubscriptionsFilterDto) {
        return this.subscriptionsService.getSubscriptions(filter);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    subscribeUser(@User("userId") userId : string, @Body() subscription : CreateSubscriptionDto) {
        return this.subscriptionsService.subscribeUser(userId, SubscriptionMapper.fromCreateDto(userId, subscription));
    }


}
