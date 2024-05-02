import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  MatDateFormats,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@src/environments/environment';
import { APP_ROUTES } from './routes';
import { effects, reducers } from './store';
import { NotificationService } from './services';

const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
  },
  display: {
    dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};
const StoreDevtools = !environment.production
  ? StoreDevtoolsModule.instrument({ maxAge: 50 })
  : [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(APP_ROUTES),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebase.config)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      MatNativeDateModule,
      StoreModule.forRoot(reducers, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }),
      EffectsModule.forRoot(effects),
      StoreDevtools,
    ]),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    NotificationService,
  ],
};
