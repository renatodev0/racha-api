import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { PrismaService } from 'src/shared/firebase/prisma.service';

@Module({
  controllers: [FieldsController],
  providers: [FieldsService, PrismaService],
})
export class FieldsModule {}
