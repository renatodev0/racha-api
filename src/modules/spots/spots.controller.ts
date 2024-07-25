import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto, UpdateSpotDto } from './dto/spots.dto';

@Controller('spots')
export class SpotsController {
  constructor(private readonly spotService: SpotsService) {}

  @Post()
  create(@Body() createSpotDto: CreateSpotDto) {
    return this.spotService.create(createSpotDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpotDto: UpdateSpotDto) {
    return this.spotService.update(id, updateSpotDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spotService.findOne(id);
  }

  @Get()
  findAll() {
    return this.spotService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.spotService.delete(id);
  }
}
