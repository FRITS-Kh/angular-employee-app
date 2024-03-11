import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { markFormGroupTouched, regex, regexErrors } from '@app/shared/utils';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  form: FormGroup = this.fb.group(
    {
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
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password),
          ],
        },
      ],
      passwordRepeat: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password),
          ],
        },
      ],
    },
    { validator: this.repeatPasswordValidator }
  );
  regexErrors = regexErrors;
  loading$: Observable<boolean> = this.store.pipe(select(fromUser.getLoading));

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) {}

  private repeatPasswordValidator(group: FormGroup): {
    [key: string]: boolean;
  } | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return passwordRepeat?.value && password?.value !== passwordRepeat.value
      ? { repeat: true }
      : null;
  }

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

    this.store.dispatch(new fromUser.SignUpEmail(credentials));
  }
}
