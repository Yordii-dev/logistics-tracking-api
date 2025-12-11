import { QueryPackageResponseDto } from './dtos/query-package.dto';
import { Injectable } from 'src/shared/infrastructure/dependency-injection/injectable';
import { Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/shared/infrastructure/dependency-injection/injection-tokens';
import type { IPackageRepository } from 'src/packages/domain/repositories/package.repository';
import type { IUserRepository } from '@users/domain/repositories/user.repository';

@Injectable()
export class QueryPackageUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.PACKAGE_REPOSITORY)
    private packageRepository: IPackageRepository,

    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}
  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.id) throw new Error('User not exists');

    const packags = await this.packageRepository.getUserPackage(userId);

    let results: QueryPackageResponseDto[] = [];

    for (const packag of packags) {
      let res: QueryPackageResponseDto = {
        id: packag.id!,
        ownerId: packag.ownerId,
        origin: packag.origin,
        destination: packag.destination,
        package_status_id: packag.package_status_id,
      };

      results.push(res);
    }

    return results;
  }
}
