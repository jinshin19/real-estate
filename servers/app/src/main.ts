// NestJs Imports
import helmet from 'helmet';
import trim from 'trim-request';
import compression from 'compression';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import userAgent from 'express-useragent';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// Modules
import { AppModule } from './app.module';

// --- FOR DEVELOPEMENT ONLY
import * as dns from 'node:dns';
dns.setServers(['8.8.4.4', '8.8.8.8']);

async function bootstrap() {
  // Variables
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: ['http://localhost:4200'],
    },
  });
  const PORT = process.env.PORT ?? 3000;
  const prefix = 'api/v1';
  const appApiTitle = 'Crud1';
  const appApiVersion = '1.0.0';
  const appApiDescription =
    'RESTful API documentation for the CRUD1 application.';

  // Config
  app.setGlobalPrefix(prefix);
  app.use(
    helmet({
      xPoweredBy: false,
      frameguard: { action: 'deny' },
    }),
  );
  app.use(compression());
  app.use(json({ limit: '50MB' }));
  app.use(urlencoded({ extended: true, limit: '50MB' }));
  app.use(cookieParser());
  app.use(trim.all);
  app.use(userAgent.express());

  const config = new DocumentBuilder()
    .setTitle(`${appApiTitle} - Api Documentation`)
    .setDescription(appApiDescription)
    .setVersion(appApiVersion)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(PORT, () =>
    Logger.log(`${appApiTitle}: Server is now running ${PORT}`),
  );
}
void bootstrap();
