import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['cookieForEncyrption']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true //* check any additional attributes on the requests and if so, it take them away & just leave the ones permitted 
    })
  )
  await app.listen(3000);
}
bootstrap();
