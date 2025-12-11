import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user';
import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.passwordHash,
      user.role_id,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.passwordHash,
      user.role_id,
    );
  }

  async save(user: User): Promise<User | null> {
    const result = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        role_id: user.roleId,
      },
      include: {
        role: true,
      },
    });

    return new User(
      result.id,
      result.name,
      result.email,
      result.passwordHash,
      result.role.id,
    );
  }
}
