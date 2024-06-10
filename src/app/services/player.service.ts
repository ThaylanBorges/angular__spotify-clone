import { SpotifyService } from 'src/app/services/spotify.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Imusic } from '../interfaces/Imusic';
import { newMusic } from '../Common/factories';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentMusic = new BehaviorSubject<Imusic>(newMusic());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusic();
  }

  async getCurrentMusic() {
    clearTimeout(this.timerId);

    // obtenho a música
    const music = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(music);

    // causo loop
    this.timerId = setTimeout(async () => {
      await this.getCurrentMusic();
    }, 4000);
  }

  setCurrentMusic(music: Imusic) {
    this.currentMusic.next(music);
  }
}
