import { QueryUserUseCase } from './query-user.usecase';
import { QueryUserResponseDto } from './dtos/query-user.dto';
import { User } from '@users/domain/entities/user';
import { IUserRepository } from '@users/domain/repositories/user.repository';
import { CreateUserUseCase } from '../create-user/create-user.usecase';

describe('QueryUserUseCase', () => {
  let userUseCase: QueryUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
    } as any;

    userUseCase = new QueryUserUseCase(mockUserRepository);
  });

  it('should be a class', async () => {
    expect(typeof QueryUserUseCase).toBe('function');
  });

  it('should have a execute method', async () => {
    expect(typeof CreateUserUseCase?.prototype?.execute).toBe('function');
  });

  it('should get a user', async () => {
    mockUserRepository.findById.mockResolvedValue(
      new User(
        '123',
        'Elvin',
        'elvin@gmail.com',
        'hashed_password',
        'uuid_12345',
      ),
    );

    const dto: QueryUserResponseDto = {
      id: '123',
      name: 'Elvin',
      email: 'elvin@gmail.com',
      role_id: 'uuid_12345',
    };
    const result = await userUseCase.execute('123');

    expect(result).toEqual(dto);
  });

  it('should throw error if email exist', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    await expect(userUseCase.execute('id_incorrect')).rejects.toThrow(
      'User not exists',
    );
  });
});
