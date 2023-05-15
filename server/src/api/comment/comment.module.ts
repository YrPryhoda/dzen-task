import { Module } from '@nestjs/common';

import { CommentQueueModule } from '../../queue/comment/comment.module';
import { CommentController } from './comment.controller';
import { WsModule } from '../../modules/ws/ws.module';

@Module({
  controllers: [CommentController],
  imports: [CommentQueueModule, WsModule],
  providers: [],
})
export class CommentApiModule {}
