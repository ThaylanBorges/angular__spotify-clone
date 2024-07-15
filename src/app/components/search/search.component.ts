import { PlayerService } from 'src/app/services/player.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  newArtist,
  newMusic,
  newMusics,
  newPlaylist,
} from 'src/app/Common/factories';
import {
  SpotifyOfArtist,
  SpotifyOfMusics,
  SpotifyOfPlaylist,
} from 'src/app/Common/spotifyHelper';
import { Iartist } from 'src/app/interfaces/Iartist';
import { Imusic } from 'src/app/interfaces/Imusic';
import { Iplaylist } from 'src/app/interfaces/Iplaylist';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // crição das propriedades e iniciando elas com factories
  artist: Iartist = newArtist();
  musics: Imusic[] = newMusics();
  currentMusic: Imusic = newMusic();
  subs: Subscription[] = [];
  playlists: Iplaylist[] = [];

  resultOfSearch: boolean = false;
  researchField = new FormControl(''); // utilizando FormControl para debounce

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.initializeSearch();
  }

  ngOnInit() {
    setInterval(() => {
      this.getCurretMusic();
    }, 5000);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe);
  }

  // método para inicializar a pesquisa com debounce
  private initializeSearch() {
    this.researchField.valueChanges
      .pipe(
        debounceTime(300), // aguarda 300ms após a última tecla pressionada
        distinctUntilChanged() // ignora se o valor anterior é igual ao próximo
      )
      .subscribe((value) => this.setAndSearch(value!));
  }

  // método que filtra e seta o dado para a service pesquisar
  async setAndSearch(value: string) {
    const cleanedValue = this.cleanSearchQuery(value);
    if (!cleanedValue) {
      console.log('Consulta inválida');
      this.resultOfSearch = false;
      return;
    }
    this.researchField.setValue(cleanedValue, { emitEvent: false });
    await this.search(cleanedValue);
  }

  // método que filtra a string para garantir que o dado não será falso
  private cleanSearchQuery(value: string): string {
    const cleanedValue = value.trim();
    const isInvalid =
      /[^a-zA-Z0-9\s]/.test(cleanedValue) || cleanedValue === '';
    return isInvalid ? '' : cleanedValue;
  }

  // método usado para fazer a pesquisa dos dados passando um atributo
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

  // processa os resultados da pesquisa
  processSearchResults(search: SpotifyApi.SearchResponse) {
    this.artist =
      this.getFirstResult(search.artists, SpotifyOfArtist) || newArtist();
    this.playlists = this.getMappedResults(search.playlists, SpotifyOfPlaylist);
    this.musics = this.getMappedResults(search.tracks, SpotifyOfMusics);
  }

  // obtém o primeiro resultado da pesquisa
  getFirstResult<T, U>(
    searchResult: SpotifyApi.PagingObject<T> | undefined,
    mapFn: (item: T) => U
  ): U | null {
    return searchResult && searchResult.items.length > 0
      ? mapFn(searchResult.items[0])
      : null;
  }

  // mapeia os resultados da pesquisa
  getMappedResults<T, U>(
    searchResult: SpotifyApi.PagingObject<T> | undefined,
    mapFn: (item: T) => U
  ): U[] {
    return searchResult ? searchResult.items.map(mapFn) : [];
  }

  // sugestões de pesquisa
  suggestion($event: string) {
    const resultSuggestion = $event;
    this.researchField.setValue(resultSuggestion, { emitEvent: false });
    this.search(resultSuggestion);
  }

  async getCurretMusic() {
    const sub = this.playerService.currentTrack.subscribe((x) => {
      this.currentMusic = x;
    });

    this.subs.push(sub);
  }

  click(tip: string, id: string) {
    this.router.navigate([`player/list/${tip}/${id}`]);
  }

  // toca a música selecionada
  playMusic(music: Imusic) {
    this.spotifyService.playMusic(music.id);
  }
}
