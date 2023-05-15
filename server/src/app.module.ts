import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/database.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
