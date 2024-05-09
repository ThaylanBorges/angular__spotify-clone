import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Iuser } from '../interfaces/Iuser';
import { Iartist } from '../interfaces/Iartist';
import { Iplaylist } from '../interfaces/Iplaylist';

import Spotify from 'spotify-web-api-js';
import {
  SpotifyOfArtist,
  SpotifyOfPlaylist,
  SpotifyOfUser,
} from '../Common/spotifyHelper';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs;
  user!: Iuser;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async initializeUser() {
    if (this.user) {
      return true;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      this.setAccessToken(token);
      await this.getSpotifyUser();
      return this.user;
    } catch (ex) {
      return false;
    }
  }

  async getSpotifyUser() {
    const userInf = await this.spotifyApi.getMe();
    this.user = SpotifyOfUser(userInf);
  }

  getUrlLogin() {
    const authEndpoint = `${SpotifyConfig.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfig.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfig.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfig.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getToken() {
    if (!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');

    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async searchUserPlaylist(offset = 0, limit = 50): Promise<Iplaylist[]> {
    const playlist = await this.spotifyApi.getUserPlaylists(this.user.id, {
      offset,
      limit,
    });

    return playlist.items.map(SpotifyOfPlaylist);
  }

  async searchTopArtists(limit = 10): Promise<Iartist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyOfArtist);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
