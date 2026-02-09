import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SessionsFeedbacksModule } from './modules/sessions-feedbacks/sessions-feedbacks.module';
import { ActualSessionsModule } from './modules/actual-sessions/actual-sessions.module';
import { SoundsModule } from './modules/sounds/sounds.module';
import { InputedSessionsModule } from './modules/inputed-sessions/inputed-sessions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersService } from './modules/users/users.service';
import { UsersController } from './modules/users/users.controller';

@Module({
  imports: [UsersModule, SubscriptionsModule, PaymentsModule, InputedSessionsModule, SoundsModule, ActualSessionsModule, SessionsFeedbacksModule, PrismaModule],
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
