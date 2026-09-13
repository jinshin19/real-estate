// Angular Imports
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const CreatePropertyForm = () => {
  return new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    type: new FormControl('', {
      //   validators: [Validators.required],
      //   nonNullable: true,
    }),
  });
};

export const CreatePropertyDetailsForm = () =>
  new FormGroup({
    sample: new FormControl('', { validators: [], nonNullable: false }),
  });
