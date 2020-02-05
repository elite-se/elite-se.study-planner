import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleCheckerComponent } from './rule-checker.component';

describe('RuleCheckerComponent', () => {
  let component: RuleCheckerComponent;
  let fixture: ComponentFixture<RuleCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
