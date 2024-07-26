import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';
import { FieldType, Sport } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFieldDto {
  @IsString()
  name: string;

  @IsInt()
  capacity: number;

  @IsUUID()
  spotId: string;

  @IsEnum(FieldType)
  type: FieldType;

  @IsEnum(Sport)
  sport: Sport;
}

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
