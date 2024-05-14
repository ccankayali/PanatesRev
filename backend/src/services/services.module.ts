import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesSchema } from './schemas/services.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IdService } from 'src/auth/id/id_components';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Service', schema: ServicesSchema }]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, IdService],
})
export class ServicesModule {}
