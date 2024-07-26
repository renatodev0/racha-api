// create-game.dto.ts
import { IsString, IsDateString, IsEnum } from 'class-validator';
import { GameType } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';

export class CreateGameDto {
  @IsString()
  name: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsEnum(GameType)
  type: GameType;

  @IsString()
  spotId: string;

  @IsString()
  fieldId: string;
}

export class UpdateGameDto extends PartialType(CreateGameDto) {}

export class AddTeamToGameDto {
  @IsString()
  gameId: string;

  @IsString()
  teamId: string;
}

export class AddUserToGameDto {
  @IsString()
  gameId: string;

  @IsString()
  userId: string;
}

export class SetResultDto {
  @IsString()
  result: string;
}
