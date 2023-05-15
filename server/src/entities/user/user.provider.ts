import { DataSource } from 'typeorm';

import { UserEntity } from './user.entity';
import {
  USER_REPOSITORY,
  DB_MODULE,
} from './../../modules/database/database.constants';

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(UserEntity);
    },
    inject: [DB_MODULE],
  },
];
