import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { CommentEntityModule } from '../../entities/comment/comment.module';
import { UploadEntityModule } from '../../entities/upload/upload.module';
import { CommentProducerService } from './comment.producer.service';
import { UserEntityModule } from '../../entities/user/user.module';
import { CommentConsumer } from './comment.consumer';
import { commentQueue } from './comment.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: commentQueue,
    }),
    CommentEntityModule,
    UserEntityModule,
    UploadEntityModule,
  ],
  providers: [CommentProducerService, CommentConsumer],
  exports: [CommentProducerService],
})
export class CommentQueueModule {}
