import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('MainService');
  console.log('process.env---', process.env.CAMPAIGN_SERVICE_PORT);
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  //
  app.setGlobalPrefix('api/camp-service');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      disableErrorMessages: false,
      stopAtFirstError: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-Version',
  });
  app.use(helmet());
  const options = new DocumentBuilder()
    .setTitle('Campaigns microservices')
    .setDescription('Campaigns related APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        in: 'header',
        name: 'jwt',
        description: 'JWT token validation',
      },
      'bearer',
    )
    .build();  
  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/camp-service/doc', app, document);
  //
  app.listen(process.env.CAMPAIGN_SERVICE_PORT ?? 3000).then(() => {
    logger.log(`Listing on port: ${process.env.CAMPAIGN_SERVICE_PORT}`);
  });
}
bootstrap();
