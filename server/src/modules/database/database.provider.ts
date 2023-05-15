import { ConfigService } from '@nestjs/config';
import { DB_MODULE } from './database.constants';
import { DataSource } from 'typeorm';

export const databaseProvider = [
  {
    provide: DB_MODULE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get('MYSQL_URL'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASS'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/../../entities/**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
