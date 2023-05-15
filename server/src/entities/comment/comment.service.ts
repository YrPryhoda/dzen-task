import { Inject, Injectable } from '@nestjs/common';
import { IsNull, Repository, DataSource } from 'typeorm';

import { CommentEntity } from './comment.entity';
import {
  COMMENT_REPOSITORY,
  DB_MODULE,
} from './../../modules/database/database.constants';
import {
  CreateCommentInterface,
  FindCommentsOptions,
} from './comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: Repository<CommentEntity>,
    @Inject(DB_MODULE)
    private sourceRepository: Repository<DataSource>,
  ) {}

  async findTree(entity: CommentEntity) {
    return this.sourceRepository.manager
      .getTreeRepository(CommentEntity)
      .findDescendantsTree(entity, { relations: ['user', 'parent', 'upload'] });
  }

  async findOne(id: number) {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['parent', 'user', 'upload'],
    });
  }

  async getRootComments({
    sortField,
    direction,
    take,
    skip,
  }: FindCommentsOptions): Promise<{
    comments: CommentEntity[];
    count: number;
  }> {
    const sortBy =
      sortField === 'userName' || sortField === 'email'
        ? { user: { [sortField]: direction } }
        : sortField === 'createdAt'
        ? { [sortField as string]: direction }
        : {};

    const [comments, count] = await this.commentRepository.findAndCount({
      relations: ['parent', 'replies'],
      where: { parent: IsNull() },
      order: { ...sortBy },
      take: take,
      skip: take * (skip - 1),
    });

    return { comments, count };
  }

  async createComment(data: CreateCommentInterface) {
    const savedComment = await this.commentRepository.save(data);
    return this.findOne(savedComment.id);
  }
}
