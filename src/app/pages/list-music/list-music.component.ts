import { SpotifyService } from 'src/app/services/spotify.service';
import { newMusic, newPlaylist } from 'src/app/Common/factories';
import { Component } from '@angular/core';
import { Imusic } from 'src/app/interfaces/Imusic';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss'],
})
export class ListMusicComponent {
  bannerImageUrl = '';
  bannerText = '';
  playIcone = faPlay;

  currtMusic: Imusic = newMusic();
  musics: Imusic[] = [];
  tip: string = '';
  subs: Subscription[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.getMusics();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe;
    });
  }

  getMusics() {
    const sub = this.activeRoute.paramMap.subscribe(async (params) => {
      const tip = params.get('tip');
      const id = params.get('id');

      this.getDataPage(tip!, id!);
    });

    this.subs.push(sub);
  }

  async getDataPage(tip: string, id: string) {
    if (tip === 'playlist') {
      this.getDataPlaylist(id);
    } else if (tip === 'artist') {
      this.getDataArtist(id);
    }
  }

  async getDataPlaylist(playlistId: string) {
    const playlist = await this.spotifyService.getPlaylistUser(playlistId);

    if (playlist) {
      this.setPageData(
        playlist.name,
        playlist.imageUrl,
        playlist.musics!,
        'Playlist'
      );
    }
  }

  async getDataArtist(artistId: string) {
    const artist = await this.spotifyService.getArtistUser(artistId);
  }

  setPageData(
    bannerText: string,
    bannerImageUrl: string,
    musics: Imusic[],
    tip: string
  ) {
    this.bannerText = bannerText;
    this.bannerImageUrl = bannerImageUrl;
    this.musics = musics;
    this.tip = tip;
  }
}
