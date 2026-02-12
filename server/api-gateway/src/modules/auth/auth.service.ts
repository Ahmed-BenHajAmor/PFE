import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService : PrismaService,  private jwtService: JwtService){}

   

    async validateUser(email: string, password: string) {
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        return user;
    }

    async login(email: string, password: string){
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id, role : user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    
}
