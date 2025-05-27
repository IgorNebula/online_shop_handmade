import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  private logger = new Logger('Errors');

  use(err: any, req: Request, res: Response, next: NextFunction): void {
    this.logger.error(`Error processing request ${req.method} ${req.originalUrl}`, err.stack || err);
    res.status(err.status || 500).json({
      statusCode: err.status || 500,
      message: err.message || 'Internal server error',
    });
  }
}
