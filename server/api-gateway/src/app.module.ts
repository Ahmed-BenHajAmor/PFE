import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth/auth.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProxyModule } from './modules/proxy/proxy.module';

@Module({
  imports: [AuthModule, ProxyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
