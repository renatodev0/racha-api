import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/firebase/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async findAll(page, limit): Promise<User | undefined> {
    const totalUsers = await this.prismaService.user.count({});
    return {
      users: await this.prismaService.user.findMany({
        take: +limit,
        skip: (+page - 1) * +limit,
      }),
      totalPages: Math.ceil(totalUsers / +limit),
    };
  }

  async create(user: CreateUserDto) {
    await this.authService.register(user.email, user.password);

    return await this.prismaService.user.create({
      data: {
        email: user.email,
        name: user.name,
        telephone: user.telephone,
        username: user.username,
      },
    });
  }

  async update(user: UpdateUserDto, id: string) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async currentUser(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
