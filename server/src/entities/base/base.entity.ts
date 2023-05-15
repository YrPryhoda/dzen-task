import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn({ update: true })
  updatedAt: Date;
}
