import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcheComponent } from './searche.component';

describe('SearcheComponent', () => {
  let component: SearcheComponent;
  let fixture: ComponentFixture<SearcheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearcheComponent]
    });
    fixture = TestBed.createComponent(SearcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
