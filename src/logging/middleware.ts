import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;

    const requestLog = { method, url, query, body };
    this.loggingService.log(`Incoming Request: ${JSON.stringify(requestLog)}`);

    res.on('finish', () => {
      const responseLog = { statusCode: res.statusCode };
      this.loggingService.log(`Response: ${JSON.stringify(responseLog)}`);
    });

    next();
  }
}
