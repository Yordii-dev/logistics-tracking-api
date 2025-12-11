import { Role } from '@users/domain/entities/role';
import { CreatePackageUseCase } from './create-package.usecase';
import { CreatePackageDto } from './dtos/create-package.dto';
import { IPackageRepository } from 'src/packages/domain/repositories/package.repository';
import { IPackageStatusRepository } from 'src/packages/domain/repositories/package-status.repository';
import { PackageStatus } from 'src/packages/domain/entities/package-status';
import {
  Package,
  PackageStatusEnum,
} from 'src/packages/domain/entities/package';
import { IUserRepository } from '@users/domain/repositories/user.repository';
import { User } from '@users/domain/entities/user';

describe('CreatePackageUseCase', () => {
  let packageUseCase: CreatePackageUseCase;
  let mockPackageRepository: jest.Mocked<IPackageRepository>;
  let mockPackageStatusRepository: jest.Mocked<IPackageStatusRepository>;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockPackageRepository = {
      save: jest.fn(),
    } as any;

    mockPackageStatusRepository = {
      findByName: jest.fn(),
    } as any;

    mockUserRepository = {
      findById: jest.fn(),
    } as any;

    packageUseCase = new CreatePackageUseCase(
      mockPackageRepository,
      mockPackageStatusRepository,
      mockUserRepository,
    );
  });

  it('should be a class', async () => {
    expect(typeof CreatePackageUseCase).toBe('function');
  });

  it('should have a execute method', async () => {
    expect(typeof CreatePackageUseCase?.prototype?.execute).toBe('function');
  });

  it('should create a package', async () => {
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
    mockPackageStatusRepository.findByName.mockResolvedValue(
      new PackageStatus('uuid_12345', PackageStatusEnum.PENDING),
    );

    const mockResolvePackage = new Package(
      'uuid_package_12345',
      userId,
      'Lima',
      'Cusco',
      'uuid_package_status_12345',
    );

    mockPackageRepository.save.mockResolvedValue(mockResolvePackage);

    const dto: CreatePackageDto = {
      ownerId: userId,
      origin: 'Lima',
      destination: 'Cusco',
    };
    const result = await packageUseCase.execute(dto);
    expect(result).toEqual({
      ownerId: mockResolvePackage.ownerId,
      origin: mockResolvePackage.origin,
      destination: mockResolvePackage.destination,
      package_status_id: mockResolvePackage.package_status_id,
    });
  });
});
