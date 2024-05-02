import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { SpinnerComponent } from '@app/shared';
import * as fromRoot from '@app/store';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromUser from '@app/store/user';
import * as fromForm from '../../store/form';
import {
  StepperComponent,
  StepperService,
  PersonalComponent,
  PersonalForm,
  ProfessionalComponent,
  ProfessionalForm,
} from './components';
import { MapperService } from './services';

export interface ProfileForm {
  personal: PersonalForm | null;
  professional: ProfessionalForm | null;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    StepperComponent,
    PersonalComponent,
    ProfessionalComponent,
    SpinnerComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MapperService, StepperService],
})
export class FormComponent implements OnInit, OnDestroy {
  dictionaries$: Observable<fromDictionaries.Dictionaries | null> =
    this.store.pipe(select(fromDictionaries.getDictionaries));
  dictionariesIsReady$: Observable<boolean> = this.store.pipe(
    select(fromDictionaries.getIsReady)
  );
  personal$: Observable<PersonalForm | null> = this.store.pipe(
    select(fromForm.getPersonalForm)
  );
  professional$: Observable<ProfessionalForm | null> = this.store.pipe(
    select(fromForm.getProfessionalForm)
  );
  loading$: Observable<boolean> = this.store.pipe(select(fromUser.getLoading));
  private profile$: Observable<ProfileForm> = this.store.pipe(
    select(fromForm.getFormState)
  );
  private user: fromUser.User = this.activatedRouter.snapshot.data['user'];
  private isEditing = false;
  private destroy = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private mapper: MapperService,
    public stepper: StepperService
  ) {}

  ngOnInit(): void {
    this.isEditing = Boolean(this.user);

    if (this.user) {
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(new fromForm.Set(form));
    }

    this.stepper.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);
    this.stepper.complete$
      .pipe(
        switchMap(() => zip(this.profile$, this.dictionaries$)),
        takeUntil(this.destroy)
      )
      .subscribe(([profile, dictionaries]) => {
        if (dictionaries) {
          this.onComplete(profile, this.user, dictionaries);
        }
      });
    this.stepper.cancel$
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.router.navigate(['/profile', this.user.uid]));
  }

  onChangedPersonal(data: PersonalForm): void {
    this.store.dispatch(new fromForm.Update({ personal: data }));
  }

  onChangedProfessional(data: ProfessionalForm): void {
    this.store.dispatch(new fromForm.Update({ professional: data }));
  }

  private onComplete(
    profile: ProfileForm,
    user: fromUser.User,
    dictionaries: fromDictionaries.Dictionaries
  ): void {
    if (this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(new fromUser.Update(request));

      return;
    }

    const request = this.mapper.formToUserCreate(profile, dictionaries);
    this.store.dispatch(new fromUser.Create(request));
  }

  get title(): string {
    return `${this.isEditing ? 'Edit' : 'New'} Profile`;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.store.dispatch(new fromForm.Clear());
  }
}
