import { SpotifyService } from 'src/app/services/spotify.service';
import { newMusic, newPlaylist } from 'src/app/Common/factories';
import { Component } from '@angular/core';
import { Imusic } from 'src/app/interfaces/Imusic';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss'],
})
export class ListMusicComponent {
  bannerImageUrl = '';
  bannerText = '';
  playIcone = faPlay;

  currentMusic: Imusic = newMusic();
  musics: Imusic[] = [];
  tip: string = '';
  subs: Subscription[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.getMusics();
    this.getCurrentMusic();
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
      this.setPageData(playlist.name, playlist.imageUrl, playlist.musics!);
      this.tip = 'Playlist';
    }
  }

  async getDataArtist(artistId: string) {
    const artist = await this.spotifyService.getArtistUser(artistId);

    if (artist) {
      this.setPageData(artist.name, artist.imageUrl, artist.musics!);
      this.tip = 'Artista';
    }
  }

  setPageData(bannerText: string, bannerImageUrl: string, musics: Imusic[]) {
    this.bannerText = bannerText;
    this.bannerImageUrl = bannerImageUrl;
    this.musics = musics;
  }

  getArtist(music: Imusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async getCurrentMusic() {
    const sub = this.playerService.currentTrack.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  async playMusic(music: Imusic) {
    await this.spotifyService.playMusic(music.id);

    this.playerService.setCurrentTrack(music);
  }
}
