import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs/operators';
import { LogsService } from '../logs.service';
@Injectable()
export class LogsInterceptor implements NestInterceptor {
  constructor(private readonly logger: LogsService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const ip = this.getIP(request);

    this.logger.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method} ip=${ip}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path}`,
          `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }

  private getIP(request: Request): string {
    let ip: string;
    const ipAddr = request.headers['x-forwarded-for'] as string;
    if (ipAddr) {
      const list = ipAddr.split(',');
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }
    return ip.replace('::ffff:', '');
  }
}
