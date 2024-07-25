import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FirebaseService } from './shared/firebase/firebase.service';
import { TeamsModule } from './modules/teams/teams.module';

@Module({
  imports: [AuthModule, UsersModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
