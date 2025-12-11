import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IRoleRepository } from '@users/domain/repositories/role.repository';
import { Role } from '@users/domain/entities/role';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(private prisma: PrismaService) {}
  async findByName(name: string): Promise<Role | null> {
    const role = await this.prisma.userRole.findFirst({
      where: {
        name,
      },
    });

    if (!role) return null;

    return new Role(role.id, role.name);
  }
}
