import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, Auth } from '@angular/fire/auth';
import { provideStorage, Storage } from '@angular/fire/storage';

import { environment } from '@src/environments/environment';
import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UploadComponent,
        provideFirebaseApp(() => initializeApp(environment.firebase.config)), //TODO: replace with a test init
        provideAuth(() => ({} as Auth)),
        provideStorage(() => ({} as Storage)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    component.file = new File([], 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
