import { Entity, Column, OneToMany } from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { BaseEntity } from '../base/base.entity';

@Entity({
  name: 'user',
  orderBy: { createdAt: 'DESC' },
})
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: false })
  userName: string;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  email: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
