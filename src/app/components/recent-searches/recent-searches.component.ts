import { Component } from '@angular/core';
import { newArtist } from 'src/app/Common/factories';
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
  resultSearch!: SpotifyApi.SearchResponse;
  artist: Iartist = newArtist();
  musics: Imusic[] = [];
  playlists: Iplaylist[] = [];
  researchField = '';

  constructor(private spotifyService: SpotifyService) {}

  setSearch(value: string) {
    this.researchField = value;
  }

  async searche(value: string) {
    try {
      const search = await this.spotifyService.search(value);
      this.processSearchResults(search);
    } catch (error) {
      console.error('Erro ao realizar busca:', error);
    }
  }

  private processSearchResults(search: SpotifyApi.SearchResponse) {
    this.searchArtist(search);
    this.searchMusic(search);
    this.searchPlaylist(search);
  }

  private searchArtist(search: SpotifyApi.SearchResponse) {
    const resultSearch = search.artists;
    if (resultSearch && resultSearch.items.length > 0) {
      this.artist = SpotifyOfArtist(resultSearch.items[0]);
      console.log(this.artist);
    } else {
      console.log('Nenhum artista encontrado');
    }
  }

  private searchPlaylist(search: SpotifyApi.SearchResponse) {
    const resultSearch = search.playlists;
    if (resultSearch) {
      this.playlists = resultSearch.items.map(SpotifyOfPlaylist);
      console.log(this.playlists);
    } else {
      console.log('Nenhuma playlist encontrada');
    }
  }

  private searchMusic(search: SpotifyApi.SearchResponse) {
    const resultSearch = search.tracks;
    if (resultSearch) {
      this.musics = resultSearch.items.map(SpotifyOfMusics);
    } else {
      console.log('Nenhuma música encontrada');
    }
  }
}
