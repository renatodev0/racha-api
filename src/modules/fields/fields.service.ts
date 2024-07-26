import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/firebase/prisma.service';
import { CreateFieldDto, UpdateFieldDto } from './dto/fields.dto';

@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) {}

  create(createFieldDto: CreateFieldDto) {
    return this.prisma.field.create({ data: createFieldDto });
  }

  findAll() {
    return this.prisma.field.findMany();
  }

  findOne(id: string) {
    return this.prisma.field.findUnique({ where: { id } });
  }

  update(id: string, updateFieldDto: UpdateFieldDto) {
    return this.prisma.field.update({
      where: { id },
      data: updateFieldDto,
    });
  }

  remove(id: string) {
    return this.prisma.field.delete({ where: { id } });
  }
}
