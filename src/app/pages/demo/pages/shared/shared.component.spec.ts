import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';

import { NotificationService } from '@app/services';
import { SharedComponent } from './shared.component';

describe('SharedComponent', () => {
  let component: SharedComponent;
  let fixture: ComponentFixture<SharedComponent>;
  let mockNotificationService: Partial<NotificationService>;

  beforeEach(async () => {
    mockNotificationService = {
      error: jest.fn(),
      success: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [MatNativeDateModule],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
