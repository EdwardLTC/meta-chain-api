import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EnvironmentModule } from '../environment/environment.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from '../exceptions/exceptions.filter';

@Module({
  imports: [EnvironmentModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
