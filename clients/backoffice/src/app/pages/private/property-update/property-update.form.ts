// Angular Imports
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const UpdatePropertyForm = () =>
  new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    type: new FormControl<string | null>(''),
    bedrooms: new FormControl<number | null>(null),
    bathrooms: new FormControl<number | null>(null),
    floorArea: new FormControl<number | null>(null),
    address: new FormControl(''),
    city: new FormControl(''),
    province: new FormControl(''),
    postal: new FormControl(''),
    price: new FormControl<number | null>(null),
    listingType: new FormControl(''),
    description: new FormControl(''),
  });
