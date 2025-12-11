import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IPackageStatusRepository } from 'src/packages/domain/repositories/package-status.repository';
import { PackageStatus } from 'src/packages/domain/entities/package-status';

@Injectable()
export class PackageStatusRepository implements IPackageStatusRepository {
  constructor(private prisma: PrismaService) {}
  async findByName(name: string): Promise<PackageStatus | null> {
    const status = await this.prisma.packageStatus.findFirst({
      where: {
        name,
      },
    });

    if (!status) return null;

    return new PackageStatus(status.id, status.name);
  }
}
