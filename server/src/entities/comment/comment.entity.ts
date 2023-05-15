import {
  ManyToOne,
  Entity,
  Column,
  TreeParent,
  TreeChildren,
  Tree,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../base/base.entity';
import { UploadEntity } from './../upload/upload.entity';

@Entity({
  name: 'comment',
  orderBy: { createdAt: 'DESC' },
})
@Tree('closure-table')
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: false })
  text: string;

  @TreeChildren()
  replies: CommentEntity[];

  @TreeParent()
  parent: CommentEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
    eager: true,
    cascade: true,
  })
  user: UserEntity;

  @OneToOne(() => UploadEntity, (upload) => upload.comment, { nullable: true })
  @JoinColumn()
  upload: UploadEntity;
}
