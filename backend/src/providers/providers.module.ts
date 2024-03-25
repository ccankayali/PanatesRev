import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './schemas/company.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:'ServiceCompany',schema:CompanySchema}])],
    controllers:[ProvidersController],
    providers:[ProvidersService]


})
export class ProvidersModule{}