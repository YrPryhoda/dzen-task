import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { commentProvider } from './comment.provider';

@Module({
  providers: [...commentProvider, CommentService],
  imports: [],
  exports: [CommentService],
})
export class CommentEntityModule {}
