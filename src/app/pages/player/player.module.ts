import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotes } from './player.routes';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { FooterUserComponent } from 'src/app/components/footer-user/footer-user.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecentSearchesComponent } from 'src/app/components/recent-searches/recent-searches.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    MenuButtonComponent,
    FooterUserComponent,
    HomeComponent,
    TopArtistComponent,
    RightPanelComponent,
    RecentSearchesComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotes),
  ],
})
export class PlayerModule {}
