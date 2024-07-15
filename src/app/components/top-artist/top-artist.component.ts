import { Component } from '@angular/core';
import { newArtists } from 'src/app/Common/factories';
import { Iartist } from 'src/app/interfaces/Iartist';
import { SpotifyService } from 'src/app/services/spotify.service';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent {
  topFiveArtists: Iartist[] = newArtists();

  // elementos do carrossel
  selectedIndex = 0;
  autoSlide = true;
  slideInterval = 4000;

  // ícones de carrossel
  faArrowLeft = faArrowAltCircleLeft;
  faArrowRight = faArrowAltCircleRight;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.getMyFiveArtists();
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

  async getMyFiveArtists() {
    const artists = await this.spotifyService.getMyTopArtists(5);

    if (artists) {
      this.topFiveArtists = artists;
    } else {
      console.log('Artists not found');
    }
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
    if (this.selectedIndex === this.topFiveArtists.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  click(tip: string, id: string) {
    this.router.navigate([`player/list/${tip}/${id}`]);
  }
}
