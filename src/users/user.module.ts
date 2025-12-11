import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.usecase';
import { INJECTION_TOKENS } from 'src/shared/infrastructure/dependency-injection/injection-tokens';
import { PrismaModule } from 'src/shared/infrastructure/persistence/prisma/prisma.module';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { PasswordHasher } from './infrastructure/services/password-hasher';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { UserController } from './api/controllers/users.controller';
import { QueryUserUseCase } from './application/use-cases/query-user/query-user.usecase';
import { CreatePackageUseCase } from 'src/packages/application/create-package/create-package.usecase';
import { QueryPackageUseCase } from 'src/packages/application/query-package/query-package.usecase';
import { PackageRepository } from 'src/packages/infrastructure/repositories/package.repository';
import { PackageStatusRepository } from 'src/packages/infrastructure/repositories/package-status.repository';
import { PackageController } from 'src/packages/api/controllers/packages.controller';

@Module({
  controllers: [UserController, PackageController],
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    QueryUserUseCase,
    CreatePackageUseCase,
    QueryPackageUseCase,
    UserRepository,
    PasswordHasher,
    RoleRepository,
    { provide: INJECTION_TOKENS.USER_REPOSITORY, useClass: UserRepository },
    { provide: INJECTION_TOKENS.PASSWORD_HASHER, useClass: PasswordHasher },
    { provide: INJECTION_TOKENS.ROLE_REPOSITORY, useClass: RoleRepository },
    {
      provide: INJECTION_TOKENS.PACKAGE_REPOSITORY,
      useClass: PackageRepository,
    },
    {
      provide: INJECTION_TOKENS.PACKAGE_STATUS_REPOSITORY,
      useClass: PackageStatusRepository,
    },
  ],
})
export class UserModule {}
