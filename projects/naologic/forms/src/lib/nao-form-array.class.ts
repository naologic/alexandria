import {AbstractControl, AbstractControlOptions, FormArray} from '@angular/forms';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {NaoFormStatic} from './nao-form-static.class';

export class NaoFormArray extends FormArray {

  constructor(
    controls: AbstractControl[], validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }


  /**
   * Get all errors from this form
   */
  public getAllErrors() {
    return NaoFormStatic.getAllErrors(this);
  }

  /**
   * List the errors in a flat map
   */
  public getAllErrorsFlat(path = '') {
    return NaoFormStatic.getAllErrorsFlat(this);
  }

  /**
   * Get last item
   */
  public getLast(): AbstractControl {
    if (this.length > 0) {
      this.at(this.length - 1);
    } else {
      return null;
    }
  }
}
