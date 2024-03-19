// cats.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './dto/data.model';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  async findAll(): Promise<Data[]> {
    return this.dataModel.find().exec();
  }
}
