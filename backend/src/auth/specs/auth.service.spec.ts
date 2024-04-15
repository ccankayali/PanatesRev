import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { IdService } from '../id/id_components';
import { generate } from 'rxjs';
import { SignUpDto } from '../dto/signup.dto';
import { SignUpProviderDto } from '../dto/signup.provider.dto';
import { RoleIds } from '../../role/enums/role.enum';

// Mock for User model
const UserModelMock = {
  username: 'testUser',
  email: 'test@example.com',
  password: 'testPassword',
  create: jest.fn().mockResolvedValue({
    _id: 'testUserId',
    name: 'Test User',
    email: 'test@example.com',
    password: 'testPassword',
  }),
};

// Mock for Company model
const CompanyModelMock = {
  name: 'testCompany',
  create: jest.fn().mockResolvedValue({
    _id: 'testProviderId',
    name: 'Test Provider',
    email: 'testprovider@example.com',
    password: 'testPassword',
    roles: [RoleIds.Provider],
  }),
};

// Mock for JwtService
const JwtServiceMock = {
  sign: (payload) => {
    return 'token';
  },
};

// Mock for IdService
const IdServiceMock = {
  generateId: () => {
    return 'testUserId';
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          // TODO: replace with your User model mock
          useValue: UserModelMock, // Use UserModelMock directly here
        },
        {
          provide: getModelToken('Company'),
          // TODO: replace with your Company model mock
          useValue: CompanyModelMock,
        },
        {
          provide: JwtService,
          // TODO: replace with your JwtService mock
          useValue: JwtServiceMock,
        },
        {
          provide: IdService,
          // TODO: replace with your IdService mock
          useValue: IdServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return a token', async () => {
    const signUpDto: SignUpDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testPassword',
      userId: IdServiceMock.generateId(),
    };

    const result = await service.signUp_user(signUpDto);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('token');
    expect(result.token).toEqual('token');
    expect(UserModelMock.create).toHaveBeenCalled();
  });
  it('should create a new provider and return a token', async () => {
    const signUpProviderDto: SignUpProviderDto = {
      name: 'Test Provider',
      email: 'testprovider@example.com',
      password: 'testPassword',
      roles: [],
    };
  
    const result = await service.signUp_provider(signUpProviderDto);
  
    expect(result).toBeDefined();
    expect(result).toHaveProperty('token');
    expect(result.token).toEqual('token');
    expect(CompanyModelMock.create).toHaveBeenCalled();
  });
  it('should return a token for a user', async () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'testPassword',
    };
    });
    it('should return a token for a provider', async () => {
      const loginProviderDto = {
        email: 'testprovider@example.com',
        password: 'testPassword',
      };
    });
    it('should throw an error if user is not found', async () => {
      const loginDto = {
        email: 'asdd@example.com',
        password: 'testPassword',
      };
    });
    it('should throw an error if provider is not found', async () => {
      const loginProviderDto = {
        email: 'testewe@example.com',
        password: 'testPassword',
      };
    });
    it('should get user by id', async () => {
      const userId = 'testUserId';
    });
});