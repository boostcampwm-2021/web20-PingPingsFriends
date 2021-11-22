import { LoggerService } from '@nestjs/common';
import 'winston-daily-rotate-file';
import * as winston from 'winston';
import { Logger, format } from 'winston';
import { loggerEnv } from 'config/logger.config';

const { combine, timestamp, prettyPrint, colorize, errors, json, ms, simple } = format;
const logDir = 'logs';
export class AppLoggingService implements LoggerService {
  private logger: Logger;

  constructor(service) {
    this.logger = winston.createLogger({
      level: 'info',
      format: combine(
        errors({ stack: true }), // <-- use errors format
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json(),
        ms(),
        colorize({ all: true }),
        prettyPrint()
      ),
      defaultMeta: { service },
      transports: [],
    });

    if (loggerEnv !== 'dev') {
      this.logger.add(
        new winston.transports.DailyRotateFile({
          level: 'http',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir,
          filename: `%DATE%.log`,
          maxFiles: 14, // 14일치 로그 파일 저장
          zippedArchive: true,
        })
      );
    }
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warning(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
