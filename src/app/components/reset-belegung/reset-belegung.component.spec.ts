import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResetBelegungComponent } from "./reset-belegung.component";
import { BelegungService } from "src/app/services/belegung.service";
import { NotificationService } from "src/app/services/notification.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

describe("ResetBelegungComponent", () => {
  let component: ResetBelegungComponent;
  let fixture: ComponentFixture<ResetBelegungComponent>;
  let mockBelegungService: jasmine.SpyObj<BelegungService>;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    mockBelegungService = jasmine.createSpyObj("BelegungService", [
      "resetBelegung",
    ]);
    mockNotificationService = jasmine.createSpyObj("NotificationService", [
      "postInfo",
    ]);

    await TestBed.configureTestingModule({
      declarations: [ResetBelegungComponent],
      imports: [FontAwesomeModule],
      providers: [
        { provide: BelegungService, useValue: mockBelegungService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetBelegungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(component.showConfirmModal).toBeFalse();
  });

  it("should open confirm modal when clicking reset button", () => {
    component.openConfirmModal();
    expect(component.showConfirmModal).toBeTrue();
  });

  it("should close confirm modal when cancel is clicked", () => {
    component.openConfirmModal();
    expect(component.showConfirmModal).toBeTrue();

    component.closeConfirmModal();
    expect(component.showConfirmModal).toBeFalse();
    expect(mockBelegungService.resetBelegung).not.toHaveBeenCalled();
  });

  it("should reset belegung and notify when confirmed", () => {
    component.openConfirmModal();
    expect(component.showConfirmModal).toBeTrue();

    component.confirmReset();

    expect(component.showConfirmModal).toBeFalse();
    expect(mockBelegungService.resetBelegung).toHaveBeenCalled();
    expect(mockNotificationService.postInfo).toHaveBeenCalledWith(
      "Belegung zurückgesetzt",
      jasmine.any(String)
    );
  });
});
