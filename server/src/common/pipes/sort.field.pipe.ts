import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SortFieldValidationPipe implements PipeTransform {
  transform(value: string) {
    const sortFields = ['userName', 'email', 'createdAt'];
    if (!value) {
      return '';
    }

    if (sortFields.some((el) => el === value)) {
      return value;
    }

    throw new BadRequestException();
  }
}
