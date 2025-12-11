import type { IUserRepository } from '@users/domain/repositories/user.repository';
import type { IPasswordHasher } from '@users/domain/services/password-hasher.service';
import type { IRoleRepository } from '@users/domain/repositories/role.repository';
import { CreateUserDto, CreateUserResponseDto } from './dtos/create-user.dto';
import { User, UserRoleEnum } from '@users/domain/entities/user';
import { Injectable } from 'src/shared/infrastructure/dependency-injection/injectable';
import { Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/shared/infrastructure/dependency-injection/injection-tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private userRepository: IUserRepository,

    @Inject(INJECTION_TOKENS.PASSWORD_HASHER)
    private passwordHasher: IPasswordHasher,

    @Inject(INJECTION_TOKENS.ROLE_REPOSITORY)
    private roleRepository: IRoleRepository,
  ) {}
  async execute(dto: CreateUserDto) {
    if (!dto.role_id) {
      const role = await this.roleRepository.findByName(UserRoleEnum.USER);
      if (!role || !role.id) throw new Error('Role not exists');

      dto.role_id = role.id;
    }

    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error('Email already exists');

    const passwordHash = await this.passwordHasher.hash(dto.password);
    const user = new User(null, dto.name, dto.email, passwordHash, dto.role_id);

    const saved = await this.userRepository.save(user);
    if (!saved || !saved.id) throw new Error('User not registered');

    let result: CreateUserResponseDto = {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      role_id: saved.roleId,
    };

    return result;
  }
}
