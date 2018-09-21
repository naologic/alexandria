import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import get from 'lodash/get';

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

  /**
   * Validator that checks if control value exists in provided array
   *
   * @param data
   * @returns {(control:AbstractControl)=>ValidationErrors}
   */
  static inArray(data): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      if (Array.isArray(data) && data.length > 0 && data.indexOf(control.value) === -1 ) {
        // --> return null
        return null;
      }
      // --> return invalid
      return {ok: false, inArray: false, actualValue: control.value};
    };

    return fn;
  }

  /**
   * Validator that checks if control value exists in provided object key
   *
   * @param obj
   * @returns {(control:AbstractControl)=>ValidationErrors}
   */
  static inObjectKey(obj): ValidatorFn {
    const fn =  (control: AbstractControl): ValidationErrors | null => {
      // --> Create: invalid object
      const invalid = {ok: false, isEnum: false, actualValue: control.value};
      if (obj && !Array.isArray(obj) && typeof obj === 'object' && Object.keys(obj).length > 0) {
        // --> Check if key exists
        if (Object.keys(obj).indexOf(control.value) > -1) {
          // --> return invalid
          return invalid;
        }
      } else {
        // --> return invalid
        return invalid;
      }
      // --> Return null
      return null;
    };
    return fn;
  }

  /**
   * Validator that checks if control value exists in provided object
   *
   * @param obj
   * @param path(string)
   * @returns {(control:AbstractControl)=>ValidationErrors}
   */
  static inObject(obj, path: string): ValidatorFn {
    const fn =  (control: AbstractControl): ValidationErrors | null => {
      // --> Create: invalid object
      const invalid = {ok: false, inObject: false, actualValue: control.value};
      if (obj && !Array.isArray(obj) && typeof obj === 'object' &&
        Object.keys(obj).length > 0 && typeof path === 'string' && path.length > 0) {

        if (get(obj, path) === control.value) {
          // --> return invalid
          return invalid;
        }

      } else {
        // --> return invalid
        return invalid;
      }
      // --> Return null
      return null;
    };
    return fn;
  }

  /**
   * Validator that checks if the control value matches any of the enum values
   *
   * @param EnumObj
   * @returns {(control:AbstractControl)=>ValidationErrors}
   */
  static isEnum(EnumObj): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      // --> Create: invalid object
      const invalid = {ok: false, isEnum: false, actualValue: control.value};
      if (EnumObj && !Array.isArray(EnumObj) && typeof EnumObj === 'object') {
        // --> Check if value exists
        if (Object.values(EnumObj).includes(control.value)) {
          // --> return invalid
          return invalid;
        }
      } else {
        // --> return invalid
        return invalid;
      }
      // --> Return null
      return null;
    };
    return fn;
  }

  /**
   * Validator that checks if control value matches any of the enum keys
   *
   * @param EnumObj
   * @returns {(control:AbstractControl)=>ValidationErrors}
   */
  static inEnumKey(EnumObj): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      // --> Set: invalid object
      const invalid = {ok: false, isEnum: false, actualValue: control.value};
      if (EnumObj && !Array.isArray(EnumObj) && typeof EnumObj === 'object') {
        // --> Check if control  values equals enum key
        if (String(EnumObj[EnumObj[control.value]]) === control.value || EnumObj[EnumObj[control.value]] === control.value) {
          // --> Return invalid
          return invalid ;
        }
      } else {
        // --> Return invalid
        return invalid;
      }
      // --> Return null
      return null;
    };
    return fn;
  }
}

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}
