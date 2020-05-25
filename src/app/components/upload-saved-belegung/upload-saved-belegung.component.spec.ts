import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSavedBelegungComponent } from './upload-saved-belegung.component';

describe('UploadSavedBelegungComponent', () => {
  let component: UploadSavedBelegungComponent;
  let fixture: ComponentFixture<UploadSavedBelegungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSavedBelegungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSavedBelegungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
