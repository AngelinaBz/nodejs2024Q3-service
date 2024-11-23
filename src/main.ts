import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as yaml from 'yamljs';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import 'dotenv/config';
import { AllExceptionsFilter } from './logging/filter';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));
  app.useLogger(loggingService);
  app.useGlobalPipes(new ValidationPipe());
  const document: OpenAPIObject = yaml.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);
  const port = process.env.PORT || 4000;
  await app.listen(port);
  process.on('uncaughtException', (err) => {
    loggingService.error('Uncaught Exception: ' + err.message, err.stack);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection: ' + reason, '');
  });
}

bootstrap();
