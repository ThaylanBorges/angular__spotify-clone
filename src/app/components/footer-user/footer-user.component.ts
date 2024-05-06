import { Component } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Iuser } from 'src/app/interfaces/Iuser';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss'],
})
export class FooterUserComponent {
  logoutIcon = faSignOut;
  user!: Iuser;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.user = this.spotifyService.user;
  }

  logout() {
    this.spotifyService.logout();
  }
}
