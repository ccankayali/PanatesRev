import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from '../comment.controller';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.entity';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findByUserId: jest.fn(),
            getCommentForCompany: jest.fn(),
            yorumYap: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  

  describe('sirketYorumlariGetir', () => {
    it('should call CommentService.getCommentForCompany', async () => {
      const companyId = '1';
      await controller.sirketYorumlariGetir(companyId);
      expect(service.getCommentForCompany).toHaveBeenCalledWith(companyId);
    });
  });

  describe('yorumYap', () => {
    it('should call CommentService.yorumYap', async () => {
      const companyId = '1';
      //const commentData: Partial<Comment> = { text: 'Hello, world!' };
      const commentData: Partial<{ text: string }> = { text: 'Hello, world!' };

      await controller.createcomment(companyId, commentData as Comment);
      expect(service.create_comment).toHaveBeenCalledWith(companyId, commentData);
    });
  });
});