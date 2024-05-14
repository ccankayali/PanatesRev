import { BadRequestException } from '@nestjs/common';
import { TypeHelpOptions } from 'class-transformer';
import { Categories } from 'src/data/entities/category.entity';
import { ComputerDetails } from './computerDetails';
import { TestDetails } from './testdetails';

export type ProductDetails = TestDetails;

export function ProductDetailsTypeFn(options: TypeHelpOptions) {
  switch (options.object?.details?.category) {
    case Categories.Computers:
      return ComputerDetails;
    case 'Test':
      return TestDetails;
  }

  throw new BadRequestException('invalid details.category input');
}
