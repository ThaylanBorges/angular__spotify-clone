import { Component, ElementRef, ViewChild } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusic } from 'src/app/Common/factories';
import { Imusic } from 'src/app/interfaces/Imusic';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}
  playIcon = faPlay;

  musics: Imusic[] = [];

  music = '';

  currentMusic: Imusic = newMusic();

  subs: Subscription[] = [];

  ngOnInit() {
    this.getMyMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  async getMyMusics() {
    this.musics = await this.spotifyService.getMySavedMusic();
  }

  getArtist(music: Imusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async getCurrentMusic() {
    const sub = this.playerService.currentTrack.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  async playMusic(music: Imusic) {
    await this.spotifyService.playMusic(music.id);

    this.playerService.setCurrentTrack(music);
  }
}
