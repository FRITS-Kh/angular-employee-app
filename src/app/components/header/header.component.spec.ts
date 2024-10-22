import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { User } from '@app/store/user';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for public properties', () => {
    expect(component.user).toBeNull();
    expect(component.isAuthorized).toBe(false);
    expect(component.isVerified).toBe(false);
  });

  it('should set user property with essential fields', () => {
    const mockUser: User = {
      uid: '123',
      name: 'John Doe',
      photoUrl: 'photo/url',
      email: 'john.doe@example.com',
      isEmailVerified: true,
      country: 'Ukraine',
      roleId: 'admin',
      role: { companyName: 'company', employeesCount: 10 },
      created: {
        isEqual: jest.fn().mockReturnValue(true),
      },
    };
    component.user = mockUser;

    expect(component.user).toEqual(mockUser);
  });

  it('should set user property with optional fields', () => {
    const mockUser: User = {
      uid: '123',
      name: 'John Doe',
      photoUrl: 'photo/url',
      email: 'john.doe@example.com',
      isEmailVerified: true,
      country: 'Ukraine',
      about: 'Lorem ipsum dolor sit amet',
      roleId: 'admin',
      role: { companyName: 'company', employeesCount: 10 },
      created: {
        isEqual: jest.fn().mockReturnValue(true),
      },
      updated: {
        isEqual: jest.fn().mockReturnValue(true),
      },
    };
    component.user = mockUser;

    expect(component.user).toEqual(mockUser);
  });

  it('should allow setting isAuthorized property', () => {
    component.isAuthorized = true;

    expect(component.isAuthorized).toBe(true);
  });

  it('should allow setting isVerified property', () => {
    component.isVerified = true;

    expect(component.isVerified).toBe(true);
  });

  it('should emit signOut event when onSignOut is called', () => {
    fixture.ngZone?.run(() => {
      const routerSpy = jest.spyOn(router, 'navigate');
      jest.spyOn(component.signOut, 'emit');
      component.onSignOut();

      expect(component.signOut.emit).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/static/welcome']);
    });
  });

  it('should navigate to profile when onProfileNavigate is called', () => {
    fixture.ngZone?.run(() => {
      const routerSpy = jest.spyOn(router, 'navigate');
      const mockUser: User = {
        uid: '123',
        name: 'John Doe',
        photoUrl: 'photo/url',
        email: 'john.doe@example.com',
        isEmailVerified: true,
        country: 'Ukraine',
        roleId: 'admin',
        role: { companyName: 'company', employeesCount: 10 },
        created: {
          isEqual: jest.fn().mockReturnValue(true),
        },
      };
      component.user = mockUser;
      component.onProfileNavigate();

      expect(routerSpy).toHaveBeenCalledWith(['/profile', mockUser.uid]);
    });
  });

  it('should navigate to "new" when user uid is undefined in onProfileNavigate', () => {
    fixture.ngZone?.run(() => {
      const routerSpy = jest.spyOn(router, 'navigate');
      component.user = null;
      component.onProfileNavigate();

      expect(routerSpy).toHaveBeenCalledWith(['/profile', 'new']);
    });
  });
});
