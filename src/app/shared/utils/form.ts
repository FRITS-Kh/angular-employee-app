import { FormArray, FormGroup } from '@angular/forms';

import { ControlItem } from '@app/models/frontend';

export const markFormGroupTouched = (formGroup: FormGroup | FormArray) => {
  Object.values(formGroup.controls).forEach((control) => {
    control.markAsTouched();

    if (
      (control instanceof FormGroup || control instanceof FormArray) &&
      control.controls
    ) {
      markFormGroupTouched(control);
    }
  });
};

export interface Control {
  items?: ControlItem[];
  changed?: () => void;
  map?: () => void;
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {
  Object.keys(controls).forEach((key) => {
    const control = controls[key];

    if (control.map) {
      control.map();
    }
  });
};
