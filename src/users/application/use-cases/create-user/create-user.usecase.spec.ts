import { Role } from '@users/domain/entities/role';
import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserRoleEnum } from '@users/domain/entities/user';
import { IRoleRepository } from '@users/domain/repositories/role.repository';
import { IUserRepository } from '@users/domain/repositories/user.repository';
import { IPasswordHasher } from '@users/domain/services/password-hasher.service';

describe('CreateUserUseCase', () => {
  let userUseCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockRoleRepository: jest.Mocked<IRoleRepository>;
  let mockHasher: jest.Mocked<IPasswordHasher>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as any;

    mockHasher = {
      hash: jest.fn(),
    } as any;

    mockRoleRepository = {
      findByName: jest.fn(),
    } as any;

    userUseCase = new CreateUserUseCase(
      mockUserRepository,
      mockHasher,
      mockRoleRepository,
    );
  });

  it('should be a class', async () => {
    expect(typeof CreateUserUseCase).toBe('function');
  });

  it('should have a execute method', async () => {
    expect(typeof CreateUserUseCase?.prototype?.execute).toBe('function');
  });

  it('should create a user when email does not exist', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockRoleRepository.findByName.mockResolvedValue(
      new Role('uuid_12345', UserRoleEnum.USER),
    );
    mockHasher.hash.mockResolvedValue('hashed_password');

    mockUserRepository.save.mockResolvedValue(
      new User(
        '123',
        'Elvin',
        'elvin@gmail.com',
        'hashed_password',
        'uuid_12345',
      ),
    );

    const dto: CreateUserDto = {
      name: 'Elvin',
      email: 'elvin@gmail.com',
      password: '123',
      role_id: 'uuid_12345',
    };
    const result = await userUseCase.execute(dto);
    expect(result).toEqual({
      id: '123',
      name: 'Elvin',
      email: 'elvin@gmail.com',
      role_id: 'uuid_12345',
    });
  });

  it('should throw error if email exist', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(
      new User(
        '123',
        'Elvin',
        'elvin@gmail.com',
        'hashed_password',
        'uuid_12345',
      ),
    );

    const dto: CreateUserDto = {
      name: 'Elvin',
      email: 'elvin@gmail.com',
      password: '123',
      role_id: 'uuid_12345',
    };

    await expect(userUseCase.execute(dto)).rejects.toThrow(
      'Email already exists',
    );
  });
});
