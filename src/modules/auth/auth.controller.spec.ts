import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      register: jest.fn().mockImplementation((userData) => Promise.resolve({ id: 1, ...userData })),
      login: jest.fn().mockImplementation((user) => Promise.resolve({ accessToken: 'token' })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('should call authService.register and return result', async () => {
      const userData = { username: 'test', password: 'pass' };
      const result = await authController.register(userData);
      expect(authService.register).toHaveBeenCalledWith(userData);
      expect(result).toEqual({ id: 1, ...userData });
    });
  });

  describe('login', () => {
    it('should call authService.login and return result', async () => {
      const user = { id: 1, username: 'test' };
      const req = { user };
      const result = await authController.login(req);
      expect(authService.login).toHaveBeenCalledWith(user);
      expect(result).toEqual({ accessToken: 'token' });
    });
  });
});
