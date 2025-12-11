export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role_id?: string;
}

export class CreateUserResponseDto {
  id: string;
  name: string;
  email: string;
  role_id: string;
  created_at?: Date;
}
