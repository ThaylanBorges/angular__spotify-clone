import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IconDefinition,
  faPauseCircle,
  faPlayCircle,
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
export class PlayerCardComponent implements OnInit, OnDestroy {
  currentTrack: Imusic = newMusic();
  playerSubscriptions: Subscription[] = [];
  isTrackPlaying: boolean = true;

  // Ícones
  iconPreviousTrack = faStepBackward;
  iconNextTrack = faStepForward;
  playPauseButtonIcon: IconDefinition = faPlayCircle;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.subscribeToCurrentTrack();
    this.subscribeToPlaybackStatus();
  }

  ngOnDestroy(): void {
    this.playerSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  subscribeToCurrentTrack(): void {
    const trackSubscription = this.playerService.currentTrack.subscribe(
      (track) => {
        this.currentTrack = track;
      }
    );

    this.playerSubscriptions.push(trackSubscription);
  }

  subscribeToPlaybackStatus(): void {
    const playbackStatusSubscription = this.playerService.isPlaying.subscribe(
      (isPlaying) => {
        this.isTrackPlaying = isPlaying;
        this.updatePlayPauseButtonIcon();
      }
    );

    this.playerSubscriptions.push(playbackStatusSubscription);
  }

  async playPreviousTrack() {
    await this.playerService.playPreviousTrack();
    console.log(this.currentTrack.id);
  }

  async playNextTrack() {
    await this.playerService.playNextTrack();
  }

  updatePlayPauseButtonIcon() {
    this.playPauseButtonIcon = this.isTrackPlaying
      ? faPauseCircle
      : faPlayCircle;
  }

  async togglePlayPause(): Promise<void> {
    if (this.isTrackPlaying) {
      await this.pauseTrack();
    } else {
      await this.resumeTrack();
    }
  }

  async pauseTrack() {
    await this.playerService.pauseTrack();
  }

  async resumeTrack() {
    await this.playerService.resumeTrack();
  }
}
