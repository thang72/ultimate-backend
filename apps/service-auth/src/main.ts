import { NestFactory } from '@nestjs/core';
import { bloodTearsMiddleware } from '@graphqlcqrs/common/middlewares';
import { SwaggerModule } from '@nestjs/swagger';
import { authSetup, setupSwagger } from '@graphqlcqrs/common/setup';
import { AppUtils } from '@graphqlcqrs/common/utils';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bloodTearsMiddleware);
  AppUtils.killAppWithGrace(app);
  authSetup(app);

  const document = SwaggerModule.createDocument(app, setupSwagger());
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 9900);
}
bootstrap();