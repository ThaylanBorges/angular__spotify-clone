import { Component } from '@angular/core';
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

  musics: Imusic[] = [];
  currentMusic: Imusic = newMusic();

  subs: Subscription[] = [];

  playIcon = faPlay;

  ngOnInit() {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  async getMusics() {
    this.musics = await this.spotifyService.searchMusic();
  }

  async getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  getArtist(music: Imusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async playMusic(music: Imusic) {
    await this.spotifyService.playMusic(music.id);

    this.playerService.setCurrentMusic(music);
  }
}
