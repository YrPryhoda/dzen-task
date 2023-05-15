import { UserEntity } from './../../entities/user/user.entity';
import { ResponseBaseDto } from './../base/response.base.dto';

export class ResponseUserDto extends ResponseBaseDto<UserEntity> {
  readonly email: string;
  readonly userName: string;

  constructor(user: UserEntity) {
    super(user);
    this.userName = user.userName;
    this.email = user.email;
  }
}
