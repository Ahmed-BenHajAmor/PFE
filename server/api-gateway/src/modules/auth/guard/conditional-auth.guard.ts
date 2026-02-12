import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

@Injectable()
export class ConditionalJwtGuard implements CanActivate {
  private jwtGuard = new JwtAuthGuard(); 

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.originalUrl === '/management/users/register' && request.method === 'POST') {
      return true; 
    }

    return this.jwtGuard.canActivate(context) as boolean;
  }
}
