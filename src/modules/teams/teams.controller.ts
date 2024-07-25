import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/teams.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamsService.delete(id);
  }

  @Patch(':id/assign-user')
  assignUser(@Param('id') teamId: string, @Body('userId') userId: string) {
    return this.teamsService.assignUser(teamId, userId);
  }

  @Patch(':id/change-owner')
  changeOwner(@Param('id') teamId: string, @Body('userId') userId: string) {
    return this.teamsService.changeOwner(teamId, userId);
  }
}
