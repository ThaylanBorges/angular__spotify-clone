import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.getTokenUrl();
  }

  getLogin() {
    window.location.href = this.spotifyService.getUrlLogin();
  }

  getTokenUrl() {
    const tokem = this.spotifyService.getTokem();
    console.log(tokem);

    return tokem;
  }
}
