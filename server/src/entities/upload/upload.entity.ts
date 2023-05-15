import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { CommentEntity } from './../comment/comment.entity';

@Entity('upload')
export class UploadEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: false })
  @Column()
  path: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  @Column()
  mimeType: string;

  @OneToOne(() => CommentEntity, (comm) => comm.upload, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  comment: CommentEntity;
}
