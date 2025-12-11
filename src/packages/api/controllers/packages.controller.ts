import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreatePackageUseCase } from 'src/packages/application/create-package/create-package.usecase';
import { CreatePackageDto } from 'src/packages/application/create-package/dtos/create-package.dto';
import { QueryPackageUseCase } from 'src/packages/application/query-package/query-package.usecase';

@Controller('packages')
export class PackageController {
  constructor(
    private readonly createPackageUseCase: CreatePackageUseCase,
    private readonly queryPackageUseCase: QueryPackageUseCase,
  ) {}

  @Get(':userId')
  async getUserPackages(@Param('userId') userId: string) {
    return await this.queryPackageUseCase.execute(userId);
  }

  @Post()
  async create(@Body() dto: CreatePackageDto) {
    return await this.createPackageUseCase.execute(dto);
  }
}
