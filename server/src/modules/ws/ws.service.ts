import { Injectable } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { ResponseCommentDto } from './../../dto/comment/response.comment.dto';

@Injectable()
export class WsService {
  constructor(private readonly wsGateway: WsGateway) {}

  newCommentCreated(comment: ResponseCommentDto) {
    this.wsGateway.server.emit('comments', comment);
  }
}
