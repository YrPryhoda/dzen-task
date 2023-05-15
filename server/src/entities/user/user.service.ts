import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './../../modules/database/database.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOrCreate(user: {
    userName: string;
    email: string;
  }): Promise<UserEntity> {
    const currentUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    return currentUser ? currentUser : this.userRepository.save(user);
  }
}
