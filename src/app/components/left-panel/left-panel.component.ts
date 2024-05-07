import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { Iplaylist } from 'src/app/interfaces/Iplaylist';

import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent {
  selectedMenu = 'home';

  playlists: Iplaylist[] = [];

  // icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.getPlaylist();
  }

  clickButton(button: string) {
    this.selectedMenu = button;
    this.router.navigateByUrl('/player/' + this.selectedMenu);
  }

  async getPlaylist() {
    this.playlists = await this.spotifyService.searchUserPlaylist();
  }
}
