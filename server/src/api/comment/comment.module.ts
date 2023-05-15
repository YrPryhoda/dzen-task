import { Module } from '@nestjs/common';

import { CommentQueueModule } from '../../queue/comment/comment.module';
import { CommentController } from './comment.controller';

@Module({
  controllers: [CommentController],
  imports: [CommentQueueModule],
  providers: [],
})
export class CommentApiModule {}
