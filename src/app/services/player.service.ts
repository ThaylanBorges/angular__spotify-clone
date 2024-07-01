import { SpotifyService } from 'src/app/services/spotify.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Imusic } from '../interfaces/Imusic';
import { newMusic } from '../Common/factories';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentTrack: BehaviorSubject<Imusic> = new BehaviorSubject<Imusic>(
    newMusic()
  );
  isPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  refreshTimerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.updateCurrentTrack();
  }

  async getPlaylist(playlistId: string) {
    await this.spotifyService.getPlaylist(playlistId);
  }

  async updateCurrentTrack() {
    clearTimeout(this.refreshTimerId);

    // Obtenho a música atual e o status de reprodução
    const track = await this.spotifyService.getCurrentMusic();
    const isTrackPlaying = await this.spotifyService.getIsPlaying();

    this.setCurrentTrack(track);
    this.setIsPlaying(isTrackPlaying);

    // Atualiza a música em um loop
    this.refreshTimerId = setTimeout(async () => {
      await this.updateCurrentTrack();
    }, 4000);
  }

  setCurrentTrack(track: Imusic) {
    this.currentTrack.next(track);
  }

  setIsPlaying(isPlaying: boolean) {
    this.isPlaying.next(isPlaying);
  }

  async playPreviousTrack() {
    await this.spotifyService.returnMusic();
  }

  async playNextTrack() {
    await this.spotifyService.nextMusic();
  }

  async pauseTrack() {
    await this.spotifyService.pauseMusic();
  }

  async resumeTrack() {
    await this.spotifyService.unpauseMusic();
  }
}
