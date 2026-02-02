  import { Module } from '@nestjs/common';
import { ActualSessionsService } from './actual-sessions.service';
import { ActualSessionsController } from './actual-sessions.controller';

@Module({
  providers: [ActualSessionsService],
  controllers: [ActualSessionsController]
})
export class ActualSessionsModule {}
