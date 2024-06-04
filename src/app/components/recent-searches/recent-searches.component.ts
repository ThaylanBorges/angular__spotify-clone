import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent {
  constructor(private spotifyService: SpotifyService) {}

  recentSearches = [];

  researchField = '';

  setSearch(value: string) {
    this.researchField = value;
  }

  searche(value: string) {
    const searchSpotify = this.spotifyService.getSearchArtist(value);
  }
}
