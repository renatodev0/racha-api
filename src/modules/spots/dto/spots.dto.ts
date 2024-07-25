import { IsString, IsOptional } from 'class-validator';

export class CreateSpotDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  addressId?: string;
}

export class UpdateSpotDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  addressId?: string;
}
