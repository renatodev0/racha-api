import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/firebase/prisma.service';
import {
  CreateGameDto,
  UpdateGameDto,
  AddTeamToGameDto,
  AddUserToGameDto,
  SetResultDto,
} from './dto/games.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async createGame(data: CreateGameDto) {
    const { spotId, fieldId, startTime, endTime } = data;

    const existingGame = await this.prisma.games.findFirst({
      where: { spotId, fieldId, startTime, endTime },
    });

    if (existingGame) {
      throw new BadRequestException(
        'There is already a game at this time on this field.',
      );
    }

    return this.prisma.games.create({
      data: {
        ...data,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
  }

  async updateGame(id: string, data: UpdateGameDto) {
    const game = await this.prisma.games.findUnique({ where: { id } });

    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    return this.prisma.games.update({
      where: { id },
      data,
    });
  }

  async deleteGame(id: string) {
    const game = await this.prisma.games.findUnique({ where: { id } });

    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    return this.prisma.games.delete({
      where: { id },
    });
  }

  async addTeamToGame(data: AddTeamToGameDto) {
    const { gameId, teamId } = data;

    return this.prisma.gamesOnTeams.create({
      data: {
        gameId,
        teamId,
      },
    });
  }

  async addUserToGame(data: AddUserToGameDto) {
    const { gameId, userId } = data;

    return this.prisma.gamesOnUsers.create({
      data: {
        gameId,
        userId,
      },
    });
  }

  async setResult(id: string, data: SetResultDto) {
    const game = await this.prisma.games.findUnique({ where: { id } });

    if (!game) {
      throw new NotFoundException('Game not found.');
    }

    return this.prisma.games.update({
      where: { id },
      data: { result: data.result },
    });
  }
}
