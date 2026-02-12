import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ManagementProxyModule } from './modules/management.proxy/management.proxy.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [AuthModule, ManagementProxyModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
