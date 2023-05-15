import { BaseInterface } from './../../entities/base/base.interface';

export class ResponseBaseDto<T extends BaseInterface> {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(entity: T) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
