import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as ip from 'ip';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.listen(process.env.APP_PORT).then(() => {
    console.log(
      `App is running on http://${ip.address()}:${process.env.APP_PORT}`,
    );
  });
}
bootstrap();
