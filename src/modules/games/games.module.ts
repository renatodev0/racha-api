import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaService } from 'src/shared/firebase/prisma.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, PrismaService],
})
export class GamesModule {}
