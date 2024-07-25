import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/firebase/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/teams.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTeamDto) {
    return this.prisma.teams.create({ data });
  }

  async update(id: string, data: UpdateTeamDto) {
    return this.prisma.teams.update({
      where: { id },
      data,
    });
  }

  async findOne(id: string) {
    return this.prisma.teams.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.teams.findMany();
  }

  async delete(id: string) {
    return this.prisma.teams.delete({
      where: { id },
    });
  }

  async assignUser(teamId: string, userId: string) {
    return this.prisma.teams.update({
      where: { id: teamId },
      data: {
        Users: {
          connect: { id: userId },
        },
      },
    });
  }

  async changeOwner(teamId: string, userId: string) {
    return this.prisma.teams.update({
      where: { id: teamId },
      data: { teamOwner: userId },
    });
  }
}
