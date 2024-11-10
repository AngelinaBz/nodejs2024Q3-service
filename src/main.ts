import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as yaml from 'yamljs';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const document: OpenAPIObject = yaml.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);
  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
