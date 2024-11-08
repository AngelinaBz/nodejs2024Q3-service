import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackModel as Track } from './interfaces/tracks.model';
import { CreateTrackDto } from './dtos/create-track.dto';
import { UpdateTrackDto } from './dtos/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findById(id: string): Track {
    const track = this.tracks.find(track => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = new Track(createTrackDto.name, createTrackDto.artistId, createTrackDto.albumId, createTrackDto.duration);
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    Object.assign(track, updateTrackDto);
    return track;
  }

  delete(id: string): void {
    const trackIndex = this.tracks.findIndex(track => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException();
    }
    this.tracks.splice(trackIndex, 1);
  }
}
