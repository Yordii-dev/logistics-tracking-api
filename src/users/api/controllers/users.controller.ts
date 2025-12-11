import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserUseCase } from '@users/application/use-cases/create-user/create-user.usecase';
import { CreateUserDto } from '@users/application/use-cases/create-user/dtos/create-user.dto';
import { QueryUserUseCase } from '@users/application/use-cases/query-user/query-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly queryUserUseCase: QueryUserUseCase,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.queryUserUseCase.execute(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.createUserUseCase.execute(dto);
  }
}
