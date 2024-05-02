import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { Iplaylist } from 'src/app/interfaces/Iplaylist';

import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
  faThermometer4,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {
  selectedMenu = 'Home';

  playlists: Iplaylist[] = [];

  // icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getPlaylist();
  }

  clickButton(button: string) {
    this.selectedMenu = button;
  }

  async getPlaylist() {
    this.playlists = await this.spotifyService.searchUserPlaylist();
  }
}
