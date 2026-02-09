import { Module } from '@nestjs/common';
import { SessionsFeedbacksService } from './sessions-feedbacks.service';
import { SessionsFeedbacksController } from './sessions-feedbacks.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SessionsFeedbacksService, PrismaService],
  controllers: [SessionsFeedbacksController]
})
export class SessionsFeedbacksModule {}
