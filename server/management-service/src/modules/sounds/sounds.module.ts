import { Module } from '@nestjs/common';
import { SoundsService } from './sounds.service';
import { SoundsController } from './sounds.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SoundsService, PrismaService],
  controllers: [SoundsController]
})
export class SoundsModule {}
