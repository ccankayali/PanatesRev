import { Service } from "src/services/schemas/services.schema";
import { ProvidersService } from "../providers.service";
import { Company } from "../schemas/company.schema";
import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from "../../services/services.service";
import { CommentService } from "../../commit/comment.service";


describe('ProvidersService', () => {
  let service: ProvidersService;
  let companyRepository: Repository<Company>;
  let serviceRepository: Repository<Service>;
  let commentRepository: Repository<Comment>;
  let serviceService: ServicesService;
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        ServicesService,
        CommentService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();
  });
});
