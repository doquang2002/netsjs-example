import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const config = app.get(ConfigService);
  app.setGlobalPrefix('/api/v1');
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Access-Control-Allow-Headers, Origin, Authorization',
    methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
  });

  const PORT = config.get<number>('PORT');

  const configDocs = new DocumentBuilder()
    .setTitle('APP')
    .setDescription('API WEB')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configDocs);
  document.tags = [];
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(PORT);
  console.log('Swagger Running: http://localhost:' + PORT + '/swagger');
}
bootstrap();
