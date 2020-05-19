import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBelegungComponent } from './save-belegung.component';

describe('SaveBelegungComponent', () => {
  let component: SaveBelegungComponent;
  let fixture: ComponentFixture<SaveBelegungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveBelegungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveBelegungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
