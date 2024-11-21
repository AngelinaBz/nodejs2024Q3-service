import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
