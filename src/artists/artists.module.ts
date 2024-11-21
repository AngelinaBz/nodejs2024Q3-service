import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
