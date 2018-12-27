import { mapValues } from 'lodash';
import { AbstractControl, AbstractControlOptions, FormArray } from '@angular/forms';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { callNativeMarkAsFunction, getValuesByMarkedAs, NaoFormStatic } from './nao-form-static.class';
import { NaoFormGroup } from './nao-form-group.class';
import { NaoFormOptions } from './nao-form-options';
import { NaoAbstractControlOptions} from './nao-form.interface';




export class NaoFormArray<T = any> extends FormArray {
  constructor(
    controls: AbstractControl[],
    options?: ValidatorFn | ValidatorFn[] | NaoFormOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, options, asyncValidator);
  }

  /**
   * Return only the values of abstract controls marked as `touched`
   */
  public getTouchedValues(): Partial<T[]> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'touched');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `untouched`
   */
  public getUntouchedValues(): Partial<T[]> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'untouched');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `dirty`
   */
  public getDirtyValues(): Partial<T[]> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'dirty');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `pristine`
   */
  public getPristineValues(): Partial<T[]> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'pristine');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `pending`
   */
  public getPendingValues(): Partial<T[]> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'pending');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }


  /**
   * Trigger the native `markAs` function
   * @param formGroup
   * @param type
   * @param options
   */
  private markAs(formGroup: NaoFormGroup|NaoFormArray, type: 'touched'|'untouched'|'dirty'|'pristine'|'pending', options?: NaoAbstractControlOptions): void {
    if (formGroup && Array.isArray(formGroup.controls)) {
      formGroup.controls.map((control) => {
        if ( control instanceof NaoFormGroup || control instanceof NaoFormArray ){
          this.markAs( control, type, options );
        } else {
          callNativeMarkAsFunction(control, type, options);
        }
      });
    }
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsTouched on all controls;
   * for NaoFormControl it references the native function markAsTouched
  */
  public markAllAsTouched(opts?: NaoAbstractControlOptions): void {
    this.markAs( this, 'touched', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsUntouched on all controls
   * for NaoFormControl it references the native function markAsUntouched
  */
  public markAllAsUntouched(opts?: NaoAbstractControlOptions): void {
    this.markAs( this, 'untouched', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsDirty on all controls
   * for NaoFormControl it references the native function markAsDirty
  */
  public markAllAsDirty(opts?: NaoAbstractControlOptions): void {
    this.markAs( this, 'dirty', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsPristine on all controls
   * for NaoFormControl it references the native function markAsPristine
  */
  public markAllAsPristine(opts?: NaoAbstractControlOptions): void {
    this.markAs( this, 'pristine', opts );
  }

  /**
   * Iterates through all the children of the NaoFormGroup, NaoFormArray and calls markAsPending on all controls
   * for NaoFormControl it references the native function markAsPending
  */
  public markAllAsPending(opts?: NaoAbstractControlOptions): void {
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
