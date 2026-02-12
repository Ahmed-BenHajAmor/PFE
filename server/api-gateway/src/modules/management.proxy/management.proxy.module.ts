import { Module } from '@nestjs/common';
import { ManagementProxyService } from './management.proxy.service';
import { ManagementProxyController } from './management.proxy.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ManagementProxyService],
  controllers: [ManagementProxyController]
})
export class ManagementProxyModule {}
