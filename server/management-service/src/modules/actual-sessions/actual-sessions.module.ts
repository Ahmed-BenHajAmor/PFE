  import { Module } from '@nestjs/common';
import { ActualSessionsService } from './actual-sessions.service';
import { ActualSessionsController } from './actual-sessions.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ActualSessionsService, PrismaService],
  controllers: [ActualSessionsController]
})
export class ActualSessionsModule {}
