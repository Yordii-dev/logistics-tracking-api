import { Package } from '../entities/package';

export interface IPackageRepository {
  save(packag: Package): Promise<Package | null>;
  getUserPackage(userId: string): Promise<Package[]>;
}
