import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NaoValidators {
  /**
   * Validator that requires controls to have a value greater than a number.
   */
  public static min(min: number): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return {'min': min, 'actualValue': control.value};
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value < min ? {'min': min, 'actualValue': control.value} : null;
    };
    return fn;
  }

  /**
   * Validator that requires controls to have a value less than a number.
   */
  public static max(max: number): ValidatorFn {
    const fn =  (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return {'max': max, 'actualValue': control.value};
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value > max ? {'max': max, 'actualValue': control.value} : null;
    };
    return fn;
  }
}

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}
