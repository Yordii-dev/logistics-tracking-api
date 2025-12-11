export enum UserRoleEnum {
  ADMIN = 'Administrador',
  USER = 'Usuario',
}

export class User {
  constructor(
    public id: string | null,
    public name: string,
    public email: string,
    public passwordHash: string,
    public roleId: string,
    public createdAt?: Date,
  ) {}
}
