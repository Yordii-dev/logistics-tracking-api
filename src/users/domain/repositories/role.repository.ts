import { Role } from '../entities/role';

export interface IRoleRepository {
  findByName(name: string): Promise<Role | null>;
}
