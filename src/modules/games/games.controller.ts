import { Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import {
  CreateGameDto,
  UpdateGameDto,
  AddTeamToGameDto,
  AddUserToGameDto,
  SetResultDto,
} from './dto/games.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  createGame(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.createGame(createGameDto);
  }

  @Patch(':id')
  updateGame(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  deleteGame(@Param('id') id: string) {
    return this.gamesService.deleteGame(id);
  }

  @Post('add-team')
  addTeamToGame(@Body() addTeamToGameDto: AddTeamToGameDto) {
    return this.gamesService.addTeamToGame(addTeamToGameDto);
  }

  @Post('add-user')
  addUserToGame(@Body() addUserToGameDto: AddUserToGameDto) {
    return this.gamesService.addUserToGame(addUserToGameDto);
  }

  @Patch(':id/result')
  setResult(@Param('id') id: string, @Body() setResultDto: SetResultDto) {
    return this.gamesService.setResult(id, setResultDto);
  }
}
