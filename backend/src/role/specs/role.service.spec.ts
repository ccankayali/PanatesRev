import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '../role.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../users/users.service';
import { NotFoundException } from '@nestjs/common';

describe('RoleService', () => {
  let service: RoleService;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: AuthService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            updateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it ('should assign role to user', async () => {
    const userId = '1';
    const roleId = 1;
    const user = { _id: '1', roles: [], name: 'test', email: 'test@example.com', password: 'test'};

    jest.spyOn(authService, 'getUserById').mockResolvedValue(user);

    await service.assignRoleToUser(userId, roleId);
    expect(authService.getUserById).toHaveBeenCalledWith(userId);
    expect(userService.updateUser).toHaveBeenCalledWith(user._id, user);
  });
  it ('should assign role to provider', async () => {
    const userId = '2';
    const roleId = 2;
    const provider = { _id: '2', roles: [], name: 'test', email: 'testpro@example.com', password: 'test'};

    jest.spyOn(authService, 'getUserById').mockResolvedValue(provider);

    await service.assignRoleToUser(userId, roleId);
    expect(userService.updateUser).toHaveBeenCalledWith(provider._id, provider);
  });
});
