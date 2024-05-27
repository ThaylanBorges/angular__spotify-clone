import { Component } from '@angular/core';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { newArtist } from 'src/app/Common/factories';
import { Iartist } from 'src/app/interfaces/Iartist';
import { Iartists } from 'src/app/interfaces/Iartists';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent {
  topArtist: Iartist = newArtist();
  topFiveArtists: Iartists[] = [];
  selectedIndex = 0;
  indicators = true;
  faArrowLeft = faArrowAltCircleLeft
  faArrowRight = faArrowAltCircleRight

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.searchArtist();
    this.searchFiveArtists();
  }

  async searchArtist() {
    const artists = await this.spotifyService.searchTopArtists(1);

    if (artists) {
      this.topArtist = artists[0];
    } else {
      console.log('Artistas não encontrados');
    }
  }

  async searchFiveArtists() {
    this.topFiveArtists = await this.spotifyService.searchTopArtists(5);
    console.log(this.topFiveArtists);
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.topFiveArtists.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.topFiveArtists.length -1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
