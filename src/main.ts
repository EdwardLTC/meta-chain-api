import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { EnvironmentService } from './environment/environment.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  process.title = 'meta-chain-api';
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  const logger = new Logger();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const env = app.get(EnvironmentService);

  app.enableCors({
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: errors => {
        return new BadRequestException('validation.fail', {
          cause: errors.map(error => ({ property: error.property, constraints: error.constraints })),
        });
      },
    }),
  );

  const documentBuilder = new DocumentBuilder().setTitle(`Meta Chain API - ${env.environment}`).addBearerAuth();

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('docs', app, document);

  logger.debug(`Documentation: http://localhost:${env.port}/docs`);

  await app.listen(env.port);
  logger.debug(`Application is running on: ${await app.getUrl()} - ${env.environment}`);
}

void bootstrap();
