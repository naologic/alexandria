import {AbstractControlOptions, FormControl} from '@angular/forms';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import { NaoFormOptions } from './nao-form-options';

export class NaoFormControl extends FormControl {
  constructor(
    formState?: any, 
    options?: ValidatorFn | ValidatorFn[] | NaoFormOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null 
  ) {
    super(formState, options, asyncValidator);
  }
}
