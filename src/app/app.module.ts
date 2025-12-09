import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EnvironmentModule } from '../environment/environment.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ExceptionsFilter } from '../exceptions/exceptions.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '../redis/redis.module';
import { EthModule } from '../eth/eth.module';
import { CollectionsModule } from '../core/collections/collections.module';
import { TokensModule } from '../core/tokens/tokens.module';
import { ListingsModule } from '../core/listings/listings.module';
import { MediaModule } from '../media/media.module';
import { LikesModule } from '../core/likes/likes.module';

@Module({
  imports: [
    EnvironmentModule,
    PrismaModule,
    RedisModule,
    AuthModule,
    EthModule,
    CollectionsModule,
    TokensModule,
    ListingsModule,
    MediaModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
