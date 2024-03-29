
import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { IdService } from 'src/id/id_component';

@Module({
    imports:[MongooseModule.forFeature([{name:Company.name,schema: CompanySchema}])],
    controllers:[ProvidersController],
    providers:[ProvidersService,IdService]
    //aslşdaslşdaşsdşasd
})
export class ProvidersModule{}

