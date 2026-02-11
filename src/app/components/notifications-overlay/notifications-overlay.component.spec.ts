import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsOverlayComponent } from './notifications-overlay.component';

describe('NotificationsOverlayComponent', () => {
  let component: NotificationsOverlayComponent;
  let fixture: ComponentFixture<NotificationsOverlayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
