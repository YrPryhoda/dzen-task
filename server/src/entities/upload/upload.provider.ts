import { DataSource } from 'typeorm';
import { UploadEntity } from './upload.entity';
import {
  UPLOAD_REPOSITORY,
  DB_MODULE,
} from '../../modules/database/database.constants';

export const uploadProvider = [
  {
    provide: UPLOAD_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(UploadEntity);
    },
    inject: [DB_MODULE],
  },
];
