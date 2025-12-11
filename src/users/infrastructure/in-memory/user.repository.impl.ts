import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryUserRepository implements IUserRepository {
  private items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((u) => u.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.items.find((u) => u.id === id) ?? null;
  }

  async save(user: User): Promise<User> {
    if (!user.id) user.id = uuidv4();
    const idx = this.items.findIndex((u) => u.id === user.id);
    if (idx === -1) this.items.push(user);
    else this.items[idx] = user;
    return user;
  }
}
