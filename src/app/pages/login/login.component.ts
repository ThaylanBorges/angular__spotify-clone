import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.getTokenUrl();
  }

  getLogin() {
    window.location.href = this.spotifyService.getUrlLogin();
  }

  getTokenUrl() {
    const token = this.spotifyService.getToken();

    if (token) {
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/player']);
    }
  }
}
