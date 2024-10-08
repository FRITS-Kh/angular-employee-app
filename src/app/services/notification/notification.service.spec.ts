import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationComponent } from './components';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  const mockSnackBar = {
    openFromComponent: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show error notification', () => {
    const mockMessage = 'mock error message';
    service.error(mockMessage);

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      NotificationComponent,
      {
        duration: 3000,
        data: { message: mockMessage },
        panelClass: 'mat-snackbar_error',
      }
    );
  });

  it('should show success notification', () => {
    const mockMessage = 'mock success message';
    service.success(mockMessage);

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      NotificationComponent,
      {
        duration: 3000,
        data: { message: mockMessage },
        panelClass: 'mat-snackbar_success',
      }
    );
  });
});
