import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/firebase/prisma.service';
import { CreateSpotDto, UpdateSpotDto } from './dto/spots.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpotsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSpotDto) {
    const prismaData: Prisma.SpotCreateInput = {
      ...data,
      Address: data.addressId ? { connect: { id: data.addressId } } : undefined,
    };

    return this.prisma.spot.create({ data: prismaData });
  }

  async update(id: string, data: UpdateSpotDto) {
    return this.prisma.spot.update({
      where: { id },
      data,
    });
  }

  async findOne(id: string) {
    return this.prisma.spot.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.spot.findMany();
  }

  async delete(id: string) {
    return this.prisma.spot.delete({
      where: { id },
    });
  }
}
