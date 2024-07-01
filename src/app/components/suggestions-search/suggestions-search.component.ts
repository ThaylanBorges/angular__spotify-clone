import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-suggestions-search',
  templateUrl: './suggestions-search.component.html',
  styleUrls: ['./suggestions-search.component.scss'],
})
export class SuggestionsSearchComponent {
  suggestions: string[] = [
    'Pagode',
    'Rock',
    'Top Brasil',
    'Top Mundo',
    'Samba',
    'Certanejo',
    'Hip Hop',
    'Pop',
  ];

  @Output() dataEmitter: EventEmitter<string> = new EventEmitter<string>();

  clickSuggetion(suggestion: string) {
    const resultSuggestions = suggestion;

    this.dataEmitter.emit(resultSuggestions);
  }
}
