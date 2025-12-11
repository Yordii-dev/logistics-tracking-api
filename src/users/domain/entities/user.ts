export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: UserRole = UserRole.USER,
  ) {}
}
