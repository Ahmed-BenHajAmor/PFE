import { Module } from '@nestjs/common';
import { InputedSessionsService } from './inputed-sessions.service';
import { InputedSessionsController } from './inputed-sessions.controller';

@Module({
  providers: [InputedSessionsService],
  controllers: [InputedSessionsController]
})
export class InputedSessionsModule {}
