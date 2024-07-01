import { newMusic } from 'src/app/Common/factories';
import { Component } from '@angular/core';
import { Imusic } from 'src/app/interfaces/Imusic';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
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

  currtMusic: Imusic = newMusic();
  musics: Imusic[] = [];
  subs: Subscription[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private playerService: PlayerService
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
      await this.getDataPlaylist(id);
    } else {
      await this.getDataArtist(id);
    }
  }

  async getDataPlaylist(playlistId: string) {
    await this.playerService.getPlaylist(playlistId);
  }

  getDataArtist(artistId: string) {}
}
