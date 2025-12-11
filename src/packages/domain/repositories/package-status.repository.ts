import { PackageStatus } from '../entities/package-status';

export interface IPackageStatusRepository {
  findByName(name: string): Promise<PackageStatus | null>;
}
