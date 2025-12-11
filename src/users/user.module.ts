import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.usecase';
import { INJECTION_TOKENS } from 'src/shared/infrastructure/dependency-injection/injection-tokens';
import { PrismaModule } from 'src/shared/infrastructure/persistence/prisma/prisma.module';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { PasswordHasher } from './infrastructure/services/password-hasher';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { UserController } from './api/controllers/users.controller';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
  providers: [
    CreateUserUseCase,
    UserRepository,
    PasswordHasher,
    RoleRepository,
    { provide: INJECTION_TOKENS.USER_REPOSITORY, useClass: UserRepository },
    { provide: INJECTION_TOKENS.PASSWORD_HASHER, useClass: PasswordHasher },
    { provide: INJECTION_TOKENS.ROLE_REPOSITORY, useClass: RoleRepository },
  ],
})
export class UserModule {}
