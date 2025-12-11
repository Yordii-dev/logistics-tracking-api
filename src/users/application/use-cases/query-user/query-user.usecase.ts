import type { IUserRepository } from '@users/domain/repositories/user.repository';
import { QueryUserResponseDto } from './dtos/query-user.dto';
import { Injectable } from 'src/shared/infrastructure/dependency-injection/injectable';
import { Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/shared/infrastructure/dependency-injection/injection-tokens';

@Injectable()
export class QueryUserUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}
  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.id) throw new Error('User not exists');

    let result: QueryUserResponseDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.roleId,
    };

    return result;
  }
}
