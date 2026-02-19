import { Module } from '@nestjs/common';
import { InputedSessionsService } from './inputed-sessions.service';
import { InputedSessionsController } from './inputed-sessions.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [InputedSessionsService, PrismaService],
  controllers: [InputedSessionsController]
})
export class InputedSessionsModule {}
