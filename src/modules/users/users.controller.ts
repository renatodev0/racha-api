import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
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
}
