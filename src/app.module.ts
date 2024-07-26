import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FirebaseService } from './shared/firebase/firebase.service';
import { TeamsModule } from './modules/teams/teams.module';
import { SpotsModule } from './modules/spots/spots.module';
import { GamesModule } from './modules/games/games.module';

@Module({
  imports: [AuthModule, UsersModule, TeamsModule, GamesModule, SpotsModule],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
