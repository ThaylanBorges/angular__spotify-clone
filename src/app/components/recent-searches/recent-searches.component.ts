import { Component } from '@angular/core';
import { newArtist, newMusics, newPlaylist } from 'src/app/Common/factories';
import {
  SpotifyOfArtist,
  SpotifyOfMusics,
  SpotifyOfPlaylist,
} from 'src/app/Common/spotifyHelper';
import { Iartist } from 'src/app/interfaces/Iartist';
import { Imusic } from 'src/app/interfaces/Imusic';
import { Iplaylist } from 'src/app/interfaces/Iplaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent {
  artist: Iartist = newArtist();
  musics: Imusic[] = newMusics();
  playlists: Iplaylist[] = newPlaylist();
  resultOfSearch: boolean = false;
  researchField = 'korn';

  constructor(private spotifyService: SpotifyService) {}

  async setAndSearch(value: string) {
    const cleanedValue = this.cleanSearchQuery(value);
    if (!cleanedValue) {
      console.log('Consulta inválida');
      this.resultOfSearch = false;
      return;
    }
    this.researchField = cleanedValue;
    await this.search(cleanedValue);
  }

  private cleanSearchQuery(value: string): string {
    const cleanedValue = value.trim();
    const isInvalid =
      /[^a-zA-Z0-9\s]/.test(cleanedValue) || cleanedValue === '';
    return isInvalid ? '' : cleanedValue;
  }

  async search(value: string) {
    try {
      const search = await this.spotifyService.search(value);
      this.processSearchResults(search);
      this.resultOfSearch = true;
    } catch (error) {
      console.error('Erro ao realizar busca:', error);
      this.resultOfSearch = false;
    }
  }

  processSearchResults(search: SpotifyApi.SearchResponse) {
    this.artist =
      this.getFirstResult(search.artists, SpotifyOfArtist) || newArtist();
    this.playlists = this.getMappedResults(search.playlists, SpotifyOfPlaylist);
    this.musics = this.getMappedResults(search.tracks, SpotifyOfMusics);
  }

  getFirstResult<T, U>(
    searchResult: SpotifyApi.PagingObject<T> | undefined,
    mapFn: (item: T) => U
  ): U | null {
    return searchResult && searchResult.items.length > 0
      ? mapFn(searchResult.items[0])
      : null;
  }

  getMappedResults<T, U>(
    searchResult: SpotifyApi.PagingObject<T> | undefined,
    mapFn: (item: T) => U
  ): U[] {
    return searchResult ? searchResult.items.map(mapFn) : [];
  }

  playMusic(music: Imusic) {
    this.spotifyService.playMusic(music.id);
  }
}
