import { Component } from '@angular/core';
import { newArtist } from 'src/app/Common/factories';
import { Iartist } from 'src/app/interfaces/Iartist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent {
  topArtist: Iartist = newArtist();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.searchArtist();
  }

  async searchArtist() {
    const artists = await this.spotifyService.searchTopArtists(1);

    if (artists) {
      this.topArtist = artists[0];
    } else {
      console.log('Artistas não encontrados');
    }
  }
}
