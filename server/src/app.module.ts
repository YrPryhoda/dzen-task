import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/database.module';
import { ApiModule } from './api/api.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MulterModule.register(),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          maxRetriesPerRequest: 3,
          host: configService.get('REDIS_URL'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    CacheModule.register({ isGlobal: true, ttl: 30, max: 50 }),
    ApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
