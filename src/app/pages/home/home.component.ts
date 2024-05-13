import { Component } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Imusic } from 'src/app/interfaces/Imusic';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private spotifyService: SpotifyService) {}

  musics: Imusic[] = [];

  playIcon = faPlay;

  ngOnInit() {
    this.getMusics();
  }

  async getMusics() {
    this.musics = await this.spotifyService.searchMusic();
    console.log(this.musics);
  }

  getArtist(music: Imusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }
}
