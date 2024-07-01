import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// player Module Components
import { PlayerComponent } from './player.component';
import { HomeComponent } from '../home/home.component';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { FooterUserComponent } from 'src/app/components/footer-user/footer-user.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { SuggestionsSearchComponent } from 'src/app/components/suggestions-search/suggestions-search.component';
import { ListMusicComponent } from '../list-music/list-music.component';

// player Routes
import { PlayerRotes } from './player.routes';

@NgModule({
  declarations: [
    PlayerComponent,
    HomeComponent,
    LeftPanelComponent,
    MenuButtonComponent,
    FooterUserComponent,
    TopArtistComponent,
    RightPanelComponent,
    PlayerCardComponent,
    SearchComponent,
    SuggestionsSearchComponent,
    ListMusicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotes),
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class PlayerModule {}
