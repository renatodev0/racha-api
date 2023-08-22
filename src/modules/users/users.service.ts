import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/firebase/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async create(user) {
    return await this.prismaService.user.create({
      data: user
    })
  }
}
