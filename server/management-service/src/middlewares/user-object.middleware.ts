import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error, log } from 'console';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  constructor(private jwtService : JwtService){}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.decode(token);
        req.user = payload;
      } catch (err) {
        error(err);
      }
    }
    next();
  }
}
