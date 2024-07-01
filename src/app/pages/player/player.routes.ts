import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { HomeComponent } from '../home/home.component';
import { ListMusicComponent } from '../list-music/list-music.component';

export const PlayerRotes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'list/:tip/:id',
        component: ListMusicComponent,
      },
    ],
  },
];
