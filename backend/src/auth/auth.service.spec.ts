import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { Company } from './schemas/providers.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { IdService } from './id/id_components';
import { UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { signUpProviderDto } from './dto/signup.provider.dto';
import { LoginProviderDto } from './dto/login.company.dto';
import { RoleIds } from '../role/enums/role.enum';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;
  let companyModel: Model<Company>;
  let jwtService: JwtService;
  let idService: IdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UserModel',
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: 'CompanyModel',
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
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

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>('UserModel');
    companyModel = module.get<Model<Company>>('CompanyModel');
    jwtService = module.get<JwtService>(JwtService);
    idService = module.get<IdService>(IdService);
  });

  describe('signUp_user', () => {
    it('should create a new user and return a token', async () => {
      const signUpDto: SignUpDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        userId: this,
      };
      const userId = 'user-id';
      const token = 'generated-token';

      jest.spyOn(idService, 'generateId').mockReturnValue(userId);
      jest.spyOn(userModel, 'create').mockResolvedValue({
        _id: userId,
        ...signUpDto,
        roles: [RoleIds.User],
      } as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.signUp_user(signUpDto);

      expect(idService.generateId).toHaveBeenCalled();
      expect(userModel.create).toHaveBeenCalledWith({
        _id: userId,
        ...signUpDto,
        password: expect.any(String),
        roles: [RoleIds.User],
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userId });
      expect(result).toEqual({ token });
    });
  });

  describe('login_user', () => {
    it('should login a user and return a token', async () => {
      const loginDto: LoginProviderDto = {
        email: 'john@example.com',
        password: 'password',
      };
      const userId = 'user-id';
      const token = 'generated-token';

      jest.spyOn(userModel, 'findOne').mockResolvedValue({
        _id: userId,
        password: 'hashed-password',
      } as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.login_user(loginDto);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: loginDto.email });
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userId });
      expect(result).toEqual({ token });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const loginDto: LoginProviderDto = {
        email: 'john@example.com',
        password: 'password',
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      await expect(authService.login_user(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const loginDto: LoginProviderDto = {
        email: 'john@example.com',
        password: 'password',
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue({
        _id: 'user-id',
        password: 'hashed-password',
      } as any);

      await expect(authService.login_user(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('signUp_provider', () => {
    it('should create a new provider and return a token', async () => {
      const signUpDto: signUpProviderDto = {
        name: 'Provider',
        email: 'provider@example.com',
        password: 'password',
        roles: [RoleIds.Provider],
      };
      const providerId = 'provider-id';
      const token = 'generated-token';

      jest.spyOn(idService, 'generateId').mockReturnValue(providerId);
      jest.spyOn(companyModel, 'create').mockResolvedValue({
        _id: providerId,
        ...signUpDto,
      } as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.signUp_provider(signUpDto);

      expect(idService.generateId).toHaveBeenCalled();
      expect(companyModel.create).toHaveBeenCalledWith({
        _id: providerId,
        ...signUpDto,
        password: expect.any(String),
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ id: providerId });
      expect(result).toEqual({ token });
    });
  });

  describe('login_provider', () => {
    it('should login a provider and return a token', async () => {
      const loginDto: LoginDto = {
        email: 'provider@example.com',
        password: 'password',
      };
      const providerId = 'provider-id';
      const token = 'generated-token';

      jest.spyOn(companyModel, 'findOne').mockResolvedValue({
        _id: providerId,
        password: 'hashed-password',
      } as any);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.login_provider(loginDto);

      expect(companyModel.findOne).toHaveBeenCalledWith({
        email: loginDto.email,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ id: providerId });
      expect(result).toEqual({ token });
    });

    it('should throw UnauthorizedException if provider is not found', async () => {
      const loginDto: LoginDto = {
        email: 'provider@example.com',
        password: 'password',
      };

      jest.spyOn(companyModel, 'findOne').mockResolvedValue(null);

      await expect(authService.login_provider(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const loginDto: LoginDto = {
        email: 'provider@example.com',
        password: 'password',
      };

      jest.spyOn(companyModel, 'findOne').mockResolvedValue({
        _id: 'provider-id',
        password: 'hashed-password',
      } as any);

      await expect(authService.login_provider(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const userId = 'user-id';
      const user = { _id: userId, name: 'John Doe' };

      jest.spyOn(userModel, 'findById').mockResolvedValue(user as any);

      const result = await authService.getUserById(userId);

      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe('getUserByToken', () => {
    it('should return a user by token', async () => {
      const token = 'valid-token';
      const userId = 'user-id';
      const user = { _id: userId, name: 'John Doe' };

      jest.spyOn(jwtService, 'verify').mockReturnValue({ id: userId });
      jest.spyOn(userModel, 'findById').mockResolvedValue(user as any);

      const result = await authService.getUserByToken(token);

      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      const token = 'invalid-token';

      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.getUserByToken(token)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
