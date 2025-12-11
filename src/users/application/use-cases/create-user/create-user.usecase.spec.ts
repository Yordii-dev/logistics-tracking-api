import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserRole } from '@users/domain/entities/user';
import { IUserRepository } from '@users/domain/repositories/user.repository';
import { IPasswordHasher } from '@users/domain/services/password-hasher.service';

describe('CreateUserUseCase', () => {
  let userUseCase: CreateUserUseCase;
  let mockRepository: jest.Mocked<IUserRepository>;
  let mockHasher: jest.Mocked<IPasswordHasher>;

  beforeEach(() => {
    mockRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as any;

    mockHasher = {
      hash: jest.fn(),
    } as any;

    userUseCase = new CreateUserUseCase(mockRepository, mockHasher);
  });

  it('should be a class', async () => {
    expect(typeof CreateUserUseCase).toBe('function');
  });

  it('should have a execute method', async () => {
    expect(typeof CreateUserUseCase?.prototype?.execute).toBe('function');
  });

  it('should create a user when email does not exist', async () => {
    mockRepository.findByEmail.mockResolvedValue(null);
    mockHasher.hash.mockResolvedValue('hashed_password');

    mockRepository.save.mockResolvedValue({
      id: '123',
      name: 'Elvin',
      email: 'elvin@gmail.com',
      passwordHash: 'hashed_password',
      role: UserRole.USER,
    } as User);

    const dto: CreateUserDto = {
      name: 'Elvin',
      email: 'elvin@gmail.com',
      password: '123',
    };
    const result = await userUseCase.execute(dto);
    expect(result).toEqual({
      id: '123',
      name: 'Elvin',
      email: 'elvin@gmail.com',
      role: UserRole.USER,
    });
  });

  it('should throw error if email exist', async () => {
    mockRepository.findByEmail.mockResolvedValue({
      id: '123',
      name: 'Elvin',
      email: 'elvin@gmail.com',
      passwordHash: 'hashed_password',
      role: UserRole.USER,
    });

    const dto: CreateUserDto = {
      name: 'Elvin',
      email: 'elvin@gmail.com',
      password: '123',
    };

    await expect(userUseCase.execute(dto)).rejects.toThrow(
      'Email already exists',
    );
  });
});
