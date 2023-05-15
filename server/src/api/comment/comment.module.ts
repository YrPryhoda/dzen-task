import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';

@Module({
  controllers: [CommentController],
  imports: [],
  providers: [],
})
export class CommentApiModule {}
