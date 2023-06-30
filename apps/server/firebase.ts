import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app/app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';

export const apiv1 = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '4GB',
  })
  .region('us-central1')
  .https.onRequest(async (req, res) => {
    const server = express();
    await createNestServer(server);
    server(req, res);
  });

  export async function createNestServer(expressInstance) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressInstance),
    );
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableCors({
      origin: '*',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, token, _id, Authorization',
    });
    return app.init();
  }