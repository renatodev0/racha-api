import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/shared/firebase/prisma.service';
import { UsersController } from './users.controller';
import { FirebaseAuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UsersService, PrismaService, FirebaseAuthGuard, AuthService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [AuthModule],
})
export class UsersModule {}
