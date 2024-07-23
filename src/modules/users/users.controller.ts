import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { FirebaseAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async findAll(@Query() { page, limit }: { page: number; limit: number }) {
    if (!page || !limit) {
      throw new BadRequestException('Page and Limit are required');
    }
    return await this.usersService.findAll(page, limit);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  async update(@Body() data: UpdateUserDto, @Param('id') id: string) {
    return await this.usersService.update(data, id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('current-user')
  async getCurrentUser(@Request() req) {
    return await this.usersService.currentUser(req.email);
  }
}
