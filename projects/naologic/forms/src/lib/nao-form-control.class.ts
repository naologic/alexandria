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
    return super.reset(null, options);
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

  /**
   * Check if value is greater then formControl value
   * @param value
   */
  public gt(value: number): boolean {
    return !isNaN(+this.value) ? this.value > value : false;
  }

  /**
   * Check if value is less then formControl value
   * @param value
   */
  public lt(value: number): boolean {
    return !isNaN(+this.value) ? this.value < value : false;
  }

  /**
   * Check if value is equal with the formControl value
   * @param value
   */
  public eq(value: string | number | boolean): boolean {
    return this.value === value;
  }

  /**
   * Check if value is greater or equal then formControl value
   * @param value
   */
  public gte(value: number): boolean {
    return !isNaN(+this.value) ? this.value >= value : false;
  }

  /**
   * Check if value is less or equal then formControl value
   * @param value
   */
  public lte(value: number): boolean {
    return !isNaN(+this.value) ? this.value <= value : false;
  }

  /**
   * Check if value is not equal with formControl value
   * @param value
   */
  public not(value: string | number | boolean): boolean {
    return this.value !== value;
  }

}
