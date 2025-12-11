import { IPasswordHasher } from '@users/domain/services/password-hasher.service';
import * as bcrypt from 'bcrypt';

export class PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
