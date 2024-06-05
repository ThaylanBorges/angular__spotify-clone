import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Iuser } from '../interfaces/Iuser';
import { Iartist } from '../interfaces/Iartist';
import { Iplaylist } from '../interfaces/Iplaylist';
import { Imusic } from '../interfaces/Imusic';

import Spotify from 'spotify-web-api-js';
import {
  SpotifyOfArtist,
  SpotifyOfMusics,
  SpotifyOfPlaylist,
  SpotifyOfUser,
} from '../Common/spotifyHelper';
import { newMusic } from '../Common/factories';

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

  async getUserPlaylist(offset = 0, limit = 50): Promise<Iplaylist[]> {
    const playlist = await this.spotifyApi.getUserPlaylists(this.user.id, {
      offset,
      limit,
    });

    return playlist.items.map(SpotifyOfPlaylist);
  }

  async getMyTopArtists(limit = 10): Promise<Iartist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyOfArtist);
  }

  async getMySavedMusic(offset = 0, limit = 50): Promise<Imusic[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map((x) => SpotifyOfMusics(x.track));
  }

  async playMusic(musicId: string) {
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<Imusic> {
    const music = await this.spotifyApi.getMyCurrentPlayingTrack();

    return SpotifyOfMusics(music.item!);
  }

  async search(value: string) {
    const search = await this.spotifyApi.search(value, [
      'artist',
      'playlist',
      'track',
    ]);

    return search;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
