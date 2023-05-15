import { DataSource } from 'typeorm';
import { CommentEntity } from './comment.entity';
import {
  COMMENT_REPOSITORY,
  DB_MODULE,
} from '../../modules/database/database.constants';

export const commentProvider = [
  {
    provide: COMMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(CommentEntity);
    },
    inject: [DB_MODULE],
  },
];
