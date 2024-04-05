import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Registration', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
      };

      const token = jwtService.sign({ sub: 'test-user-id' });

      const response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect(201);

      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });

    it('should signup a new user', async () => {
      const signupData = {
        name: 'janedoe',
        email: 'jane@example.com',
        password: 'password456',
      };

      const token = jwtService.sign({ sub: 'test-user-id' });

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .set('Authorization', `Bearer ${token}`)
        .send(signupData)
        .expect(201);

      expect(response.body.name).toBe(signupData.name);
      expect(response.body.email).toBe(signupData.email);
    });
  });

  describe('User Login', () => {
    it('should login a user successfully', async () => {
      const loginData = {
        email: 'jane@example.com',
        password: 'password456',
      };

      const token = jwtService.sign({ sub: 'test-user-id' });

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Authorization', `Bearer ${token}`)
        .send(loginData)
        .expect(200);

      expect(response.body.access_token).toBeDefined();
    });

    it('should fail to login with invalid credentials', async () => {
      const loginData = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      const token = jwtService.sign({ sub: 'test-user-id' });

      await request(app.getHttpServer())
        .post('/auth/login')
        .set('Authorization', `Bearer ${token}`)
        .send(loginData)
        .expect(401);
    });
  });
});