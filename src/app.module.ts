import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FirebaseService } from './shared/firebase/firebase.service';
import { TeamsModule } from './modules/teams/teams.module';
import { SpotsModule } from './modules/spots/spots.module';
import { GamesModule } from './modules/games/games.module';
import { FieldsModule } from './modules/fields/fields.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TeamsModule,
    GamesModule,
    SpotsModule,
    FieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
