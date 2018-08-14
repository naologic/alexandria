import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { mapValues, filter, isArray, isPlainObject, keys, merge, last } from 'lodash';

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
   *
   *
   * @param {AbstractControl} formEl
   * @returns {{}}
   */
  public static getAllErrors(formEl: AbstractControl) {
    let errs = {};
    if (formEl instanceof FormGroup) {

      // -->Get: all errors
      errs = mapValues(formEl.controls, (vv, cc) => {
        const err = NaoFormStatic.getAllErrors(vv);
        return (err) ? err : null;
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
   *
   *
   * @param {AbstractControl} formEl
   * @param {string} path
   * @returns {{}}
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

          const err = walk(fEl.get(k), newPath);
          errs[newPath] = (err) ? err : null;
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
   *
   * @param object
   * @param sep
   * @returns {{} & any}
   */
  public static flatten(object, sep = '/') {
    return Object.assign( {}, ...function _flatten( objectBit, path = '' ) {
      return [].concat(
        ...Object.keys( objectBit )
          .map(key => typeof objectBit[ key ] === 'object' ?
            _flatten( objectBit[ key ], `${ path ? path + sep : path }${ key }` )
            : ( { [ `${ path ? path + sep : path }${ key }` ]: objectBit[ key ] } )
          )
      );
    }( object ) );
  }
}
