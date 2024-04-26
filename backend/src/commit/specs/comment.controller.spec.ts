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

  describe('create', () => {
    it('should call CommentService.create', async () => {
      const commentData: Partial<Comment> = { text: 'Hello, world!' }; 
      await controller.create(commentData as Comment);
      expect(service.create).toHaveBeenCalledWith(commentData);
    });
  });

  describe('findAll', () => {
    it('should call CommentService.find', async () => {
      await controller.findAll();
      expect(service.find).toHaveBeenCalled();
    });
  });

  describe('findByUserId', () => {
    it('should call CommentService.findByUserId', async () => {
      const userId = '1';
      await controller.findByUserId(userId);
      expect(service.findByUserId).toHaveBeenCalledWith(userId);
    });
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
      const commentData: Partial<Comment> = { text: 'Hello, world!' };
      await controller.yorumYap(companyId, commentData as Comment);
      expect(service.yorumYap).toHaveBeenCalledWith(companyId, commentData);
    });
  });
});