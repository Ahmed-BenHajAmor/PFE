import { Module } from '@nestjs/common';
import { SessionsFeedbacksService } from './sessions-feedbacks.service';
import { SessionsFeedbacksController } from './sessions-feedbacks.controller';

@Module({
  providers: [SessionsFeedbacksService],
  controllers: [SessionsFeedbacksController]
})
export class SessionsFeedbacksModule {}
