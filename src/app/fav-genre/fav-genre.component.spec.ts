import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavGenreComponent } from './fav-genre.component';

describe('FavGenreComponent', () => {
  let component: FavGenreComponent;
  let fixture: ComponentFixture<FavGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavGenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
