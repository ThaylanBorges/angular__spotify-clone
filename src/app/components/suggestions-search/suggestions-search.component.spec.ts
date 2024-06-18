import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsSearchComponent } from './suggestions-search.component';

describe('SuggestionsSearchComponent', () => {
  let component: SuggestionsSearchComponent;
  let fixture: ComponentFixture<SuggestionsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionsSearchComponent],
    });
    fixture = TestBed.createComponent(SuggestionsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
