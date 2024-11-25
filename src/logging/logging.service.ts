import {
  Injectable,
  ConsoleLogger,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private logLevel: string;
  private maxSize: number;
  private logFilePath = path.join(__dirname, '../../logs/app.log');
  private logErrorFilePath = path.join(__dirname, '../../logs/error.log');
  private currentLogLevel: number;

  private logLevels: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    log: 2,
    debug: 3,
    verbose: 4,
  };

  constructor() {
    super();
    this.logLevel = process.env.LOG_LEVEL;
    this.currentLogLevel = this.logLevels[this.logLevel as LogLevel] ?? 2;
    this.maxSize = (Number(process.env.LOG_FILE_MAX_SIZE) || 20) * 1024;

    const logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.checkSize(this.logFilePath);
    this.checkSize(this.logErrorFilePath);
  }

  private isLogging(level: LogLevel): boolean {
    return this.logLevels[level] <= this.currentLogLevel;
  }

  private checkSize(filePath: string) {
    try {
      const stats = fs.statSync(filePath);
      if (stats.size >= this.maxSize && stats.size > 0) {
        this.rotateLog(filePath);
      }
    } catch (error) {
      super.error(error.message);
    }
  }

  private rotateLog(filePath: string) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const newFilePath = `${filePath}.${timestamp}`;
    fs.renameSync(filePath, newFilePath);
  }

  private writeToFile(filePath: string, message: string) {
    this.checkSize(filePath);
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(filePath, logMessage);
  }

  log(message: string) {
    if (this.isLogging('log')) {
      this.writeToFile(this.logFilePath, `INFO: ${message}`);
      super.log(message);
    }
  }

  error(message: string, trace?: string) {
    if (this.isLogging('error')) {
      this.writeToFile(
        this.logErrorFilePath,
        `ERROR: ${message} - Trace: ${trace}`,
      );
      super.error(message, trace);
    }
  }

  debug(message: string) {
    if (this.isLogging('debug')) {
      this.writeToFile(this.logFilePath, `DEBUG: ${message}`);
      super.debug(message);
    }
  }

  verbose(message: string) {
    if (this.isLogging('verbose')) {
      this.writeToFile(this.logFilePath, `VERBOSE: ${message}`);
      super.verbose(message);
    }
  }

  warn(message: string) {
    if (this.isLogging('warn')) {
      this.writeToFile(this.logFilePath, `WARN: ${message}`);
      super.warn(message);
    }
  }
}
