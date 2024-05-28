import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArtistsControll } from "./artists/artists.controll";
import { Artist, ArtistSchema } from "./schemas/artists.schema";
import { AlbumsController } from "./albums/albums.controller";
import { Album, AlbumSchema } from "./schemas/albums.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Track, TracksSchema } from "./schemas/tracks.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { PassportModule } from "@nestjs/passport";
import { AuthGuard } from "./auth/token-auth.guard";
import { LocalStrategy } from "./auth/local.strategy";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/music-nest"),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TracksSchema },
      { name: User.name, schema: UserSchema }
    ]),
    PassportModule
  ],
  controllers: [AppController, ArtistsControll, AlbumsController],
  providers: [AppService, AuthService, LocalStrategy, AuthGuard]
})
export class AppModule {
}
