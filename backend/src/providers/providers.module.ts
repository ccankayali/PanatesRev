
import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { IdService } from 'src/auth/id/id_components';
import { CommentService } from 'src/commit/comment.service';
import { Comment, CommentSchema } from 'src/commit/comment.entity';
import { ServicesService } from 'src/services/services.service';
import { Service, ServicesSchema } from 'src/services/schemas/services.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }, { name: Comment.name, schema: CommentSchema }, { name: Service.name, schema: ServicesSchema }])],
    controllers: [ProvidersController],
    providers: [ProvidersService, IdService, CommentService, ServicesService]
})
export class ProvidersModule { }

