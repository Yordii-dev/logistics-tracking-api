import { IUserRepository } from '@users/domain/repositories/user.repository';
import { IPasswordHasher } from '@users/domain/services/password-hasher.service';
import { CreateUserDto, UserResponseDto } from './dtos/create-user.dto';
import { User } from '@users/domain/entities/user';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
  ) {}
  async execute(dto: CreateUserDto) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error('Email already exists');
    const passwordHash = await this.passwordHasher.hash(dto.password);
    const user = new User(null, dto.name, dto.email, passwordHash);
    const saved = await this.userRepository.save(user);
    if (!saved.id) throw new Error('User ID not generated');

    let result: UserResponseDto = {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      role: saved.role,
    };

    return result;
  }
}
