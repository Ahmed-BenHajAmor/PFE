import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersController } from './users.controller';

@Module({
  
  providers: [UsersService, PrismaService, JwtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
