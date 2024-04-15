import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { IdService } from '../../auth/id/id_components';
import { Model } from 'mongoose';
import { Comment } from '../comment.entity';

describe('CommentService', () => {
  let service: CommentService;
  let commentModel: Model<Comment>;
  let idService: IdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getModelToken(Comment.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            populate: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: IdService,
          useValue: {
            generateId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentModel = module.get<Model<Comment>>(getModelToken(Comment.name));
    idService = module.get<IdService>(IdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const commit = new Comment();
      (idService.generateId as jest.Mock).mockReturnValue('testId');
      jest.spyOn(commentModel, 'create').mockResolvedValue(commit);

      commit.save = jest.fn().mockResolvedValue(commit);

      const result = await service.create(commit);

      expect(idService.generateId).toHaveBeenCalled();
      expect(commentModel.create).toHaveBeenCalledWith({ ...commit, _id: 'testId' });
      expect(commit.save).toHaveBeenCalled();
      expect(result).toEqual({ _id: 'testId', commit_details: commit.commit_details, commit_date: commit.commit_date });
    });
  });

  describe('find', () => {
    it('should find comments', async () => {
      const comments = [new Comment() as Document<unknown, {}, Comment> & Comment & Required<{ _id: string; }>];
      jest.spyOn(commentModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(comments),
        }),
      } as any);

      const result = await service.find();

      expect(commentModel.find).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining({ _id: expect.any(String) })]));
    });
  });

  // TODO: Add more tests for each method in your CommentService
});
