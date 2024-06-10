import { Component } from '@angular/core';
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusic } from 'src/app/Common/factories';
import { Imusic } from 'src/app/interfaces/Imusic';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent {
  music: Imusic = newMusic();
  subs: Subscription[] = [];

  // ícones
  iconBackArrow = faStepBackward;
  iconPassArrow = faStepForward;
  iconPlayer = faPlay;
  icoPause = faPause;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getMusicPlaying();
  }

  ngOnDestroy(): void {
    this.subs.forEach((subs) => subs.unsubscribe());
  }

  getMusicPlaying() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.music = music;
    });

    this.subs.push(sub);
  }
}
