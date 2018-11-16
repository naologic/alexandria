import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
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
  * Validator to check the length of a string
  */
  public static maxLength(length: number): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || (typeof control.value === 'string' && control.value.length <= length)) {
        return null;
      }

      return { ok: false, maxLength: length, 'actualValue': control.value, actualLength: control.value.length };
    };
    return fn;
  }

  /**
   * Validator to check the length of a string
   */
  public static minLength(length: number): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || (typeof control.value === 'string' && control.value.length >= length)) {
        return null;
      }

      return { ok: false, minLength: length, 'actualValue': control.value, actualLength: control.value.length };
    };
    return fn;
  }

  /**
   * Validator to check if string is email
   */
  public static isEmail(): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      const EmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (typeof control.value === 'string' && EmailRegex.test(control.value.toLowerCase())) {
        return null;
      }
      return { 'isEmail': false, 'actualValue': control.value };
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
   */
  static inObjectKey(obj): ValidatorFn {
    const fn =  (control: AbstractControl): ValidationErrors | null => {
      // --> Create: invalid object
      const invalid = {ok: false, inObjectKey: false, actualValue: control.value};
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
   */
  static inEnum(EnumObj): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      // --> Create: invalid object
      const invalid = {ok: false, inEnum: false, actualValue: control.value};
      if (EnumObj && !Array.isArray(EnumObj) && typeof EnumObj === 'object') {
        // --> Check if value exists
        for (const key in EnumObj) {
          if (control.value === EnumObj[key]) {
            // break;
            // --> return invalid
            return invalid;
          }
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
   */
  static inEnumKey(EnumObj): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      // --> Set: invalid object
      const invalid = {ok: false, inEnumKey: false, actualValue: control.value};
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

  /**
   * Validator that checks if control value is a valid US SSN
   *
   */
  static isSSN(): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      // --> Declare invalid object
      const invalid = {ok: false, isSSN: false, actualValue: control.value};
      if (control.value && typeof control.value === 'string') {
        // --> Define pattern
        const ssnPattern = /^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\1(?!0000)[0-9]{4}$/;
        // --> Check if string matches the pattern
        return ssnPattern.test(control.value) ? null : invalid;
      } else {
        // --> Return invalid
        return invalid;
      }
    };
    return fn;
  }

  /**
   * Validator that checks if control value is a valid US Zip format
   *
   */
  static isUSZip(): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      // --> Declare invalid object
      const invalid = {ok: false, isUSZip: false, actualValue: control.value};
      if (control.value && typeof control.value === 'string') {
        // --> Pattern
        const zipPattern = /^(?!0{2})[0-9]{5}$/;
        // --> Check if string matches the pattern
        return zipPattern.test(control.value) ? null : invalid;
      } else {
        // --> Return invalid
        return invalid;
      }
    };
    return fn;
  }

  /**
   * Validator that checks if control value is a valid US Phone format
   *
   */
  static isUSPhone(): ValidatorFn {
    const fn = (control: AbstractControl): ValidationErrors | null => {
      // --> Declare invalid object
      const invalid = {ok: false, isUSZip: false, actualValue: control.value};
      if (control.value && typeof control.value === 'string') {
        // --> Pattern
        const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // --> Check if string matches the pattern
        return phonePattern.test(control.value) ? null : invalid;
      } else {
        // --> Return invalid
        return invalid;
      }
    };
    return fn;
  }

  /**
   * Validator that checks if ONLY ONE condition is true
   * Will return invalid if more than one
   * @example
   *
   *  public groupForm: FormGroup;
   *
   *  constructor( private fb: FormBuilder) {
   *    this.groupForm = this.fb.group({
   *      name: 'Tiger',
   *      weight: 85,
   *      animals: this.fb.array([
   *        this.fb.group({
   *          type: 'Tiger',
   *          weight: 85
   *        })
   *      ])
   *    }, {validator: NaoValidator.solveOne(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight'])});
   *    // --> Form validation will fail (both conditions are true)
   *    // -->  This will pass validation ex: NaoValidator.solveOne(['weight', '==', 'animals[0].weight'])
   *  }
   *
   * @param conditions(Array)
   */
  static solveOne(...conditions: any[]): ValidatorFn {
    const fn = (group: FormGroup): ValidationErrors | null => {
      if (conditions.length > 0) {
        // --> Check conditions and get an array of booleans
        const validate: boolean[] = validateOperation(conditions, group);
        // --> Check if only one condition is true
        const count: boolean = validate.reduce((pv, cv) => cv === true ? pv + 1 : pv, 0) === 1;
        // --> Return null or invalid
        return count ? null : {ok: false, solveOne: false, actualValue: group.value};
      }
      return {ok: false, solveOne: false, actualValue: group.value};
    };
    return fn;
  }

  /**
   * Validator that checks if at least one condition is true
   *
   * @example
   *
   *  public groupForm: FormGroup;
   *
   *  constructor( private fb: FormBuilder) {
   *    this.groupForm = this.fb.group({
   *      name: 'Tiger',
   *      weight: 85,
   *      animals: this.fb.array([
   *        this.fb.group({
   *          type: 'Tiger',
   *          weight: 75
   *        })
   *      ])
   *    }, {validator: NaoValidator.solveSome(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight'])});
   *    // --> Form validation will pass (one of the conditions is true)
   *  }
   *
   * @param conditions(Array)
   */
  static solveSome(...conditions: any[]): ValidatorFn {
    const fn = (group: FormGroup): ValidationErrors | null => {
      if (conditions.length > 0) {
        // --> Check conditions and get an array of booleans
        const validate: boolean[] = validateOperation(conditions, group);
        // --> Check if at last one condition is true
        const count: boolean = validate.reduce((pv, cv) => cv === true ? pv + 1 : pv, 0) >= 1;
        // --> Return null or invalid
        return count ? null : {ok: false, solveSome: false, actualValue: group.value};
      }
      return {ok: false, solveSome: false, actualValue: group.value};
    };
    return fn;
  }

  /**
   * Validator that checks if none of the condition are true
   *
   * @example
   *
   *  public groupForm: FormGroup;
   *
   *  constructor( private fb: FormBuilder) {
   *    this.groupForm = this.fb.group({
   *      name: 'Tiger',
   *      weight: 85,
   *      animals: this.fb.array([
   *        this.fb.group({
   *          type: 'Tiger',
   *          weight: 75
   *        })
   *      ])
   *    }, {validator: NaoValidator.solveNone(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight'])});
   *    // --> Form validation will fail, one of the conditions is true
   *  }
   *
   * @param conditions(Array)
   */
  static solveNone(...conditions: any[]): ValidatorFn {
    const fn = (group: FormGroup): ValidationErrors | null => {
      if (conditions.length > 0) {
        // --> Check conditions and get an array of booleans
        const validate = validateOperation(conditions, group);
        // --> Check that no condition is true
        const valid: boolean = validate.reduce((pv, cv) => pv && cv, true);
        // --> Return null or invalid
        return !valid ? null : {ok: false, solveNone: false, actualValue: group.value};
      }
      return {ok: false, solveSome: false, solveNone: group.value};
    };
    return fn;
  }

  /**
   * Validator that checks if ALL condition are true
   *
   * @example
   *
   *  public groupForm: FormGroup;
   *
   *  constructor( private fb: FormBuilder) {
   *    this.groupForm = this.fb.group({
   *      name: 'Tiger',
   *      weight: 85,
   *      animals: this.fb.array([
   *        this.fb.group({
   *          type: 'Tiger',
   *          weight: 75
   *        })
   *      ])
   *    }, {validator: NaoValidator.solveAll(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight'])});
   *    // --> Form validation will fail, only one condition is true
   *  }
   *
   * @param conditions(Array)
   */
  static solveAll(...conditions: any[]): ValidatorFn {
    const fn = (group: FormGroup): ValidationErrors | null => {
      if (conditions.length > 0) {
        // --> Check conditions and get an array of booleans
        const validate = validateOperation(conditions, group);
        // --> Check if ALL condition are true
        const valid: boolean = validate.reduce((pv, cv) => pv && cv, true);
        // --> Return null or invalid
        return valid ? null : {ok: false, solveAll: false, actualValue: group.value};
      }
      return {ok: false, solveAll: false, actualValue: group.value};
    };
    return fn;
  }

}

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

/**
 * Check conditions array against FormGroup values
 * Returns array of booleans;
 *
 * @param conditions(Array)
 * @param group(FormGroup)
 */
function validateOperation(conditions: any[], group: FormGroup ): boolean[] {
  const result: boolean[] = conditions
    .map(c => {
      let v = false;
      switch (c[1]) {
        case '!=':
          v = get(group.value, c[2]) !== group.value[c[0]];
          break;
        case '==':
          v = get(group.value, c[2]) === group.value[c[0]];
          break;
        case '>=':
          v = get(group.value, c[2]) >= group.value[c[0]];
          break;
        case '<=':
          v = get(group.value, c[2]) <= group.value[c[0]];
          break;
        case '>':
          v = get(group.value, c[2]) > group.value[c[0]];
          break;
        case '<':
          v = get(group.value, c[2]) < group.value[c[0]];
          break;
      }
      return v;
    });
  return result;
}
