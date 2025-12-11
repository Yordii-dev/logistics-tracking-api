import { CreatePackageDto } from './dtos/create-package.dto';
import { Injectable } from 'src/shared/infrastructure/dependency-injection/injectable';
import { Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/shared/infrastructure/dependency-injection/injection-tokens';
import type { IPackageRepository } from 'src/packages/domain/repositories/package.repository';
import type { IPackageStatusRepository } from 'src/packages/domain/repositories/package-status.repository';
import {
  Package,
  PackageStatusEnum,
} from 'src/packages/domain/entities/package';
import type { IUserRepository } from '@users/domain/repositories/user.repository';

@Injectable()
export class CreatePackageUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.PACKAGE_REPOSITORY)
    private packageRepository: IPackageRepository,

    @Inject(INJECTION_TOKENS.PACKAGE_STATUS_REPOSITORY)
    private packageStatusRepository: IPackageStatusRepository,

    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}
  async execute(dto: CreatePackageDto) {
    const user = await this.userRepository.findById(dto.ownerId);
    if (!user || !user.id) throw new Error('User/Owner not exists');

    if (!dto.package_status_id) {
      const package_status = await this.packageStatusRepository.findByName(
        PackageStatusEnum.PENDING,
      );
      if (!package_status || !package_status.id)
        throw new Error('Package status not exists');

      dto.package_status_id = package_status.id;
    }

    const packag = new Package(
      null,
      dto.ownerId,
      dto.origin,
      dto.destination,
      dto.package_status_id,
    );

    const saved = await this.packageRepository.save(packag);
    if (!saved || !saved.id) throw new Error('Package not registered');

    let result: CreatePackageDto = {
      ownerId: saved.ownerId,
      origin: saved.origin,
      destination: saved.destination,
      package_status_id: saved.package_status_id,
    };

    return result;
  }
}
