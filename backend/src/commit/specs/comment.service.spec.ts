import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { IdService } from '../../auth/id/id_components';
import { Model } from 'mongoose';
import { Comment } from '../comment.entity';

const mockComment = {
  _id: 'testId',
  user: 'testUser',
  company: 'testCompany',
  service: 'testService',
  commit_date: new Date(),
  commit_details: 'testDetails',
  text: 'testText',
};

const mockIdService = {
  generateId: jest.fn().mockReturnValue('testId'),
};

const mockCommentModel = () => ({
  new: jest.fn().mockResolvedValue(mockComment),
  constructor: jest.fn().mockResolvedValue(mockComment),
  find: jest.fn(),
  create: jest.fn(),
  populate: jest.fn(),
  exec: jest.fn(),
});

describe('CommentService', () => {
  let service: CommentService;
  let commentModel: Model<Comment>;
  let idService: IdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getModelToken('Comment'),
          useValue: mockCommentModel(),
        },
        {
          provide: IdService,
          useValue: mockIdService,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentModel = module.get<Model<Comment>>(getModelToken('Comment'));
    idService = module.get<IdService>(IdService);
  });

  const mockCommentWithId = { ...mockComment, _id: 'testId' }; // Declare the mockComment variable before using it
  it('should create a new comment', async () => {
    const mockCreate = jest.spyOn(commentModel, 'create').mockResolvedValue([mockCommentWithId] as Comment[]);
    (idService.generateId as jest.Mock).mockReturnValue('testId');

    const result = await service.create(mockCommentWithId as Comment);

    expect(idService.generateId).toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledWith(mockCommentWithId);
    expect(result).toEqual([mockCommentWithId]);
  });
});