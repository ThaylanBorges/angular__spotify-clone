import { Component } from '@angular/core';
import { newArtists } from 'src/app/Common/factories';
import { Iartist } from 'src/app/interfaces/Iartist';
import { SpotifyService } from 'src/app/services/spotify.service';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent {
  topArtists: Iartist[] = newArtists();

  // elementos do carrossel
  selectedIndex = 0;
  autoSlide = true;
  slideInterval = 4000;

  // icones de carrossel
  faArrowLeft = faArrowAltCircleLeft;
  faArrowRight = faArrowAltCircleRight;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.searchArtists();
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  // muda a imagem a cada 4 segundos
  autoSlideImages() {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  async searchArtists() {
    const artists = await this.spotifyService.searchTopArtists(5);

    if (artists) {
      this.topArtists = artists;
    } else {
      console.log('Artists not found');
    }
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.topArtists.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.topArtists.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
