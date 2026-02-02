import { Module } from '@nestjs/common';
import { SoundsService } from './sounds.service';
import { SoundsController } from './sounds.controller';

@Module({
  providers: [SoundsService],
  controllers: [SoundsController]
})
export class SoundsModule {}
