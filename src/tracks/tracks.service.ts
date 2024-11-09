import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackModel as Track } from './interfaces/tracks.model';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';
import { tracks, favorites } from 'src/constants';

@Injectable()
export class TracksService {
  findAll(): Track[] {
    return tracks;
  }

  findById(id: string): Track {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = new Track(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );
    tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    Object.assign(track, updateTrackDto);
    return track;
  }

  delete(id: string): void {
    const trackIndex = tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException();
    }
    tracks.splice(trackIndex, 1);
    const trackIndexInFavs = favorites.tracks.findIndex((track) => track === id);
    favorites.tracks.splice(trackIndexInFavs, 1);
  }
}
