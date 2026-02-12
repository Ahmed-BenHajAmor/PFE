import { Injectable, NestMiddleware } from '@nestjs/common';
import { log } from 'console';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.user) {
      req.user = req.body.user;    // attach to req.user
      delete req.body.user;        // remove from body
    }
    next();
  }
}
