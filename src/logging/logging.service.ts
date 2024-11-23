import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private logger = new Logger(LoggingService.name);
  private logLevel: string;
  private maxSize: number;
  private logFilePath = path.join(__dirname, '../../logs/app.log');
  private logErrorFilePath = path.join(__dirname, '../../logs/error.log');

  constructor() {
    this.logLevel = process.env.LOG_LEVEL;
    this.maxSize = (Number(process.env.LOG_FILE_MAX_SIZE) || 20) * 1024;

    const logDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
  }

  private checkSize(filePath: string) {
    const stats = fs.statSync(filePath);
    if (stats.size > this.maxSize) {
      this.rotateLog(filePath);
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
    if (
      this.logLevel === 'LOG' ||
      this.logLevel === 'DEBUG' ||
      this.logLevel === 'VERBOSE'
    ) {
      this.writeToFile(this.logFilePath, `INFO: ${message}`);
      this.logger.log(message);
    }
  }

  error(message: string, trace?: string) {
    this.writeToFile(
      this.logErrorFilePath,
      `ERROR: ${message} - Trace: ${trace}`,
    );
    this.logger.error(message, trace);
  }

  debug(message: string): void {
    if (this.logLevel === 'DEBUG' || this.logLevel === 'VERBOSE') {
      this.writeToFile(this.logFilePath, `DEBUG: ${message}`);
      this.logger.debug(message);
    }
  }

  verbose(message: string): void {
    if (this.logLevel === 'VERBOSE') {
      this.writeToFile(this.logFilePath, `VERBOSE: ${message}`);
      this.logger.verbose(message);
    }
  }

  warn(message: string): void {
    this.writeToFile(this.logFilePath, `WARN: ${message}`);
    this.logger.warn(message);
  }
}
