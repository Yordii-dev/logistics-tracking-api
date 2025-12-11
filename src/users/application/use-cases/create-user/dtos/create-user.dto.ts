export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
}
