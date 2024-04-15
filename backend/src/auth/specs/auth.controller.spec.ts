import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth/auth.controllers';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SignUpDto } from '../dto/signup.dto';
import { IdService } from '../id/id_components';

const IdServiceMock = {
  generateId: () => {
    return 'testUserId';
  },
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp_user: jest.fn(),
            login_user: jest.fn(),
            signUp_provider: jest.fn(),
            login_provider: jest.fn(),
            getUserById: jest.fn(),
            getUserByToken: jest.fn(),
          },
        },
        {
          provide: IdService,
          useValue: IdServiceMock,
        },
        JwtAuthGuard,
        RolesGuard,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp_user', () => {
    it('should call signUp_user method of AuthService', async () => {
      const signUpDto: SignUpDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testPassword',
        userId: IdServiceMock.generateId(),
      };

      await controller.signUp_user(signUpDto);

      expect(authService.signUp_user).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('login_user', () => {
    it('should call login_user method of AuthService', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'testPassword',
      };
    });
  });

  describe('signUp_provider', () => {
    it('should call signUp_provider method of AuthService', async () => {
      const signUpProviderDto = {
        name: 'Test Provider',
        email: 'testprovider@example.com',
        password: 'testPassword',
        roles: [],
      };
    });
  });

  describe('login_provider', () => {
    it('should call login_provider method of AuthService', async () => {
      const loginProviderDto = {
        email: 'testprovider@example.com',
        password: 'testPassword',
      };
    });
  });

  describe('getUser', () => {
    it('should call getUserById method of AuthService', async () => {
      const userId = 'testUserId';

      await controller.getUser(userId);

      expect(authService.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe('getUserByToken', () => {
    it('should call getUserByToken method of AuthService', async () => {
      const token = 'testToken';
      const mockRequest = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      await controller.getUserByToken(mockRequest.headers.authorization);

      expect(authService.getUserByToken).toHaveBeenCalledWith(token);
    });
  });
});
