import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/shared/firebase/prisma.service';
import { UsersController } from './users.controller';
import { FirebaseAuthGuard } from '../auth/auth.guard';

@Module({
  providers: [UsersService, PrismaService, FirebaseAuthGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
