import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    email: [
      null,
      {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.email,
        ],
      },
    ],
    password: [
      null,
      {
        updateOn: 'change',
        validators: [Validators.required],
      },
    ],
  });
  regexErrors = regexErrors;
  loading$: Observable<boolean> = this.store.pipe(select(fromUser.getLoading));

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}

  onSubmit(): void {
    if (!this.form.valid) {
      markFormGroupTouched(this.form);

      return;
    }

    const value = this.form.value;
    const credentials: fromUser.EmailPasswordCredentials = {
      email: value.email,
      password: value.password,
    };

    this.store.dispatch(new fromUser.SignInEmail(credentials));
  }
}
