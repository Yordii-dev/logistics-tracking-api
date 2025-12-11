import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '@users/application/use-cases/create-user/create-user.usecase';
import { CreateUserDto } from '@users/application/use-cases/create-user/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.createUserUseCase.execute(dto);
  }
}
