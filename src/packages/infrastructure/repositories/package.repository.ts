import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IPackageRepository } from 'src/packages/domain/repositories/package.repository';
import { Package } from 'src/packages/domain/entities/package';

@Injectable()
export class PackageRepository implements IPackageRepository {
  constructor(private prisma: PrismaService) {}

  async save(packag: Package): Promise<Package | null> {
    const result = await this.prisma.package.create({
      data: {
        ownerId: packag.ownerId,
        origin: packag.origin,
        destination: packag.destination,
        package_status_id: packag.package_status_id,
      },
    });

    return new Package(
      result.id,
      result.ownerId,
      result.origin,
      result.destination,
      result.package_status_id,
    );
  }

  async getUserPackage(userId: string): Promise<Package[]> {
    const packages = await this.prisma.package.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        owner: true,
      },
    });

    const results: Package[] = [];

    for (const pkg of packages) {
      results.push(
        new Package(
          pkg.id,
          pkg.ownerId,
          pkg.origin,
          pkg.destination,
          pkg.package_status_id,
        ),
      );
    }

    return results;
  }
}
