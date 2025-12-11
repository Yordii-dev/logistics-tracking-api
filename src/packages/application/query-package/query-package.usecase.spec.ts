import { QueryPackageUseCase } from './query-package.usecase';
import { QueryPackageResponseDto } from './dtos/query-package.dto';
import { User } from '@users/domain/entities/user';
import { IUserRepository } from '@users/domain/repositories/user.repository';
import { IPackageRepository } from 'src/packages/domain/repositories/package.repository';
import { CreatePackageUseCase } from '../create-package/create-package.usecase';
import { Package } from 'src/packages/domain/entities/package';

describe('QueryPackageUseCase', () => {
  let packageUseCase: QueryPackageUseCase;
  let mockPackageRepository: jest.Mocked<IPackageRepository>;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockPackageRepository = {
      getUserPackage: jest.fn(),
    } as any;

    mockUserRepository = {
      findById: jest.fn(),
    } as any;

    packageUseCase = new QueryPackageUseCase(
      mockPackageRepository,
      mockUserRepository,
    );
  });

  it('should be a class', async () => {
    expect(typeof QueryPackageUseCase).toBe('function');
  });

  it('should have a execute method', async () => {
    expect(typeof CreatePackageUseCase?.prototype?.execute).toBe('function');
  });

  it('should get a package', async () => {
    const userId = 'uuid_owner_12345';

    mockUserRepository.findById.mockResolvedValue(
      new User(
        userId,
        'Elvin',
        'elvin@gmail.com',
        'hashed_password',
        'uuid_rol_12345',
      ),
    );

    const mockResolvePackage = new Package(
      'uuid_package_12345',
      userId,
      'Lima',
      'Cusco',
      'uuid_package_status_12345',
    );

    mockPackageRepository.getUserPackage.mockResolvedValue([
      mockResolvePackage,
    ]);
    const result = await packageUseCase.execute(userId);

    const dto: QueryPackageResponseDto = {
      ...mockResolvePackage,
      id: 'uuid_package_12345',
    };
    expect(result).toEqual([dto]);
  });

  it('should throw error if user not exist', async () => {
    const userId = 'id_incorrect';

    mockUserRepository.findById.mockResolvedValue(null);

    await expect(packageUseCase.execute(userId)).rejects.toThrow(
      'User not exists',
    );
  });
});
