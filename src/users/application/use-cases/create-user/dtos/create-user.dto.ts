export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role_id?: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role_id: string;
  createdAt?: Date;
}
