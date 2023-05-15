import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SortDirectionValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      return '';
    }

    if (value !== 'asc' && value !== 'desc') {
      throw new BadRequestException();
    }

    return value;
  }
}
