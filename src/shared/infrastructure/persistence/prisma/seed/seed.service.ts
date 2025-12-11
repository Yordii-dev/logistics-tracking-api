import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PACKAGE_STATUS, ROLES } from './data/data';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async setRoles() {
    for (const role of Object.values(ROLES)) {
      await this.prisma.userRole.upsert({
        where: { name: role },
        update: {},
        create: { name: role },
      });
    }
  }

  async setPackageStatus() {
    for (const status of Object.values(PACKAGE_STATUS)) {
      await this.prisma.packageStatus.upsert({
        where: { name: status },
        update: {},
        create: { name: status },
      });
    }
  }
  async run() {
    await this.setRoles();
    await this.setPackageStatus();
  }
}
