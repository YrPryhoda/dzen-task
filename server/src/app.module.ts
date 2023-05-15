import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ApiModule } from './api/api.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MulterModule.register(),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
