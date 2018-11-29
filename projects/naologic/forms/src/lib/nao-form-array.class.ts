import { mapValues } from 'lodash';
import { AbstractControl, AbstractControlOptions, FormArray } from '@angular/forms';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import  {NaoFormStatic } from './nao-form-static.class';
import { NaoFormGroup } from '@naologic/forms/public_api';

export class NaoFormArray extends FormArray {

  constructor(
    controls: AbstractControl[], validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  // https://github.com/naologic/alexandria/issues/20
  private markAs( formGroup: NaoFormGroup|NaoFormArray, type: 'touched'|'untouched'|'dirty'|'pristine'|'pending', options? : { onlySelf?:boolean, emitEvent?: boolean } ): void {
    mapValues(formGroup.controls, (control) => {
      if ( control instanceof NaoFormGroup || control instanceof NaoFormArray ){
        this.markAs( control, type, options );
      }
      else {
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
       }
    });    
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsTouched on all controls;
   * for NaoFormControl it references the native function markAsTouched  
  */
  public markAllAsTouched(opts?: { onlySelf?: boolean }): void {
    this.markAs( this, 'touched', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsUntouched on all controls
   * for NaoFormControl it references the native function markAsUntouched  
  */
  public markAllAsUntouched(opts?: { onlySelf?: boolean }): void {
    this.markAs( this, 'untouched', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsDirty on all controls
   * for NaoFormControl it references the native function markAsDirty
  */
  public markAllAsDirty(opts?: { onlySelf?: boolean }): void {
    this.markAs( this, 'dirty', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsPristine on all controls
   * for NaoFormControl it references the native function markAsPristine
  */
  public markAllAsPristine(opts?: { onlySelf?: boolean }): void {
    this.markAs( this, 'pristine', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsPending on all controls
   * for NaoFormControl it references the native function markAsPending
  */
  public markAllAsPending(opts?: { onlySelf?: boolean, emitEvent?: boolean }): void {
    this.markAs( this, 'pending', opts );
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
      return this.at(this.length - 1);
    } else {
      return null;
    }
  }
}
