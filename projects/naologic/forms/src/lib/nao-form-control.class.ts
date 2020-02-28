import {AbstractControlOptions, FormControl} from '@angular/forms';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import { NaoFormOptions } from './nao-form-options';
import { NaoFormStatic } from './nao-form-static.class';

export class NaoFormControl extends FormControl {
  constructor(
    formState?: any,
    options?: ValidatorFn | ValidatorFn[] | NaoFormOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, options, asyncValidator);
  }

  /**
   * Resets the form control, marking it pristine and untouched, and setting the value to null.
   */
  public empty(options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void {
    return super.reset( null, options );
  }

  /**
   * Get all errors
   */
  public getAllErrors() {
    return NaoFormStatic.getAllErrors(this);
  }

  /**
   * Check if control has errors
   */
  public hasErrors(): boolean {
    return this.getAllErrors() !== null;
  }
}
