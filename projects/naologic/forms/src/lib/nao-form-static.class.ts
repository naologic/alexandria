import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { mapValues, isArray, isPlainObject, keys } from 'lodash';
import { NaoAbstractControlOptions } from './nao-form.interface';
import { NaoFormGroup } from './nao-form-group.class';
import { NaoFormArray } from './nao-form-array.class';
import { NaoFormControl } from './nao-form-control.class';

/**
 * Form Helper
 *
 *
 */
export class NaoFormStatic {
  /**
   * Get all errors from a Abstract Control
   *    -- loop all children
   *    -- eliminate keys that don't have errors
   */
  public static getAllErrors(formEl: AbstractControl) {
    let errs = {};
    if (formEl instanceof FormGroup) {

      // -->Get: all errors
      errs = mapValues(formEl.controls, (vv, cc) => {
        const err = NaoFormStatic.getAllErrors(vv);
        return err || null;
      });
      // -->Eliminate: null values
      keys(errs)
        .map(k => {
          if (!errs[k]) {
            delete errs[k];
          }
          if (isArray(errs[k]) && errs[k].length === 0) {
            delete errs[k];
          }
        });
      // -->Check: no keys, means no errors. Delete branch
      if (keys(errs).length === 0) {
        return null;
      }

    } else if (formEl instanceof FormArray) {

      errs = formEl.controls.map(el => {
        return NaoFormStatic.getAllErrors(el);
      })
      .filter(s => isPlainObject(s))
      .filter(s => keys(s).length);

    } else if (formEl instanceof FormControl) {
      errs = <ValidationErrors>formEl.errors || null;
    }

    return errs;
  }

  /**
   * List the errors in a flat map
   */
  public static getAllErrorsFlat(formEl: AbstractControl, path = '') {
    const errs2 = {};

    const walk = (fEl, p) => {
      let errs = {};

      if (fEl instanceof FormGroup || fEl instanceof FormArray) {
        const ks = keys(fEl.controls);
        const isArr = fEl instanceof FormArray;

        ks.map(k => {
          const newKey = (isArr) ? '[' + k + ']' : k;
          const newPath = (isArr) ? (p) ? p + newKey : newKey : (p) ? p + '.' + newKey : newKey;

          // const err = walk(fEl.get(k), newPath);
          // errs[newPath] = err || null;
          walk(fEl.get(k), newPath);
        });
        // -->Eliminate: null values
        keys(errs)
          .map(k => {
            if (!errs[k]) {
              delete errs[k];
            }
            if (isArray(errs[k]) && errs[k].length === 0) {
              delete errs[k];
            }
          });

      } else if (fEl instanceof FormControl) {
        errs = <ValidationErrors>fEl.errors || null;
        if (errs) {
          errs2[p] = errs;
        }
      }
    };
    walk(formEl, path);

    return errs2;
  }

  /**
   * Flatten a deep object
   */
  public static flatten(object, sep = '/') {
    const oo = Object.assign( {}, ...function _flatten( objectBit, path = '' ) {
      return [].concat(
        ...Object.keys( objectBit )
          .map(key => typeof objectBit[ key ] === 'object' ?
            _flatten( objectBit[ key ], `${ path ? path + sep : path }${ key }` )
            : ( { [ `${ path ? path + sep : path }${ key }` ]: objectBit[ key ] } )
          )
      );
    }( object ) );
    return oo;
  }
}

/**
 * Call the native function by type
 * @param control
 * @param type
 * @param options
 */
const callNativeMarkAsFunction = (control: AbstractControl, type: 'touched'|'untouched'|'dirty'|'pristine'|'pending', options?: NaoAbstractControlOptions ) => {
  switch (type) {
    case 'touched':
      control.markAsTouched(options);
      break;
    case 'untouched':
      control.markAsUntouched(options);
      break;
    case 'dirty':
      control.markAsDirty(options);
      break;
    case 'pristine':
      control.markAsPristine(options);
      break;
    case 'pending':
      control.markAsPending(options);
      break;
  }
};

/**
 * Get only the values that have a specific `markAs` flag
 * @param control
 * @param type
 */
const getValuesByMarkedAs = (control: AbstractControl, type: 'touched'|'untouched'|'dirty'|'pristine'|'pending'): { ok: boolean, value?: any, type: string } => {
  if (['touched', 'untouched', 'dirty', 'pristine', 'pending'].indexOf(type) === -1) {
    throw Error(`The only allowed 'markAs' types are touched|untouched|dirty|pristine|pending. I can't accept ${type}`);
  }
  // -->Init: res
  const res: any = {ok: false, value: null, type};

  // -->Check: if the `markAs` property is as expected
  if (control) {
    res.ok = true;
    if (control instanceof FormGroup) {
      // -->Init: the value by type
      res.value = {} as any;

      mapValues(control.controls, (ctrl, index) => {
        // -->Check: current value
        const {ok, value} = getValuesByMarkedAs(ctrl, type);
        // -->Return: if valid
        if (ok) {
          res.value[index] = value;
        }
      });
    } else if (control instanceof FormArray) {
      if (Array.isArray(control.controls)) {
        // -->Init: the value by type
        res.value = [];

        // -->Loop: values
        control.controls.map(ctrl => {
          // -->Check: current value
          const {ok, value} = getValuesByMarkedAs(ctrl, type);
          // -->Return: if valid
          if (ok) {
            res.value.push(value);
          }
        });
      } else {
        throw Error(`I received a form array with no controls index. This is not normal`);
      }
    } else if (control instanceof FormControl) {
      if (control[type]) {
        res.value = control.value;
      } else {
        res.ok = false;
      }
    } else {
      throw Error(`Invalid instance type made it's way into NaoFromGroup getTouchedValues! ${typeof control}`);
    }
  }
  // -->Return: the result
  return res;
};

/**
 * Deep clones the given AbstractControl, preserving values, validators, async validators, and disabled status.
 * @param control AbstractControl
 * @returns AbstractControl
 */
export function cloneAbstractControl<T extends AbstractControl>(control: T): T {
  let newControl: T;

  if (control instanceof NaoFormGroup) {
    const formGroup = new NaoFormGroup({}, control.validator, control.asyncValidator);
    const controls = control.controls;

    Object.keys(controls).forEach(key => {
      formGroup.addControl(key, cloneAbstractControl(controls[key]));
    });

    newControl = formGroup as any;
  } else if (control instanceof NaoFormArray) {
    const formArray = new NaoFormArray([], control.validator, control.asyncValidator);

    control.controls.forEach(formControl => formArray.push(cloneAbstractControl(formControl)));

    newControl = formArray as any;
  } else if (control instanceof NaoFormControl) {
    newControl = new NaoFormControl(control.value, control.validator, control.asyncValidator) as any;
  } else {
    throw new Error('Error: unexpected control value');
  }

  if (control.disabled) {
    newControl.disable({ emitEvent: false });
  }

  return newControl;
}

export {
  callNativeMarkAsFunction,
  getValuesByMarkedAs
};
