import { AbstractControl, FormGroup } from '@angular/forms';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { isArray, keys, mapValues, isPlainObject, set, get} from 'lodash';
import { callNativeMarkAsFunction, getValuesByMarkedAs, NaoFormStatic } from './nao-form-static.class';
import { NaoFormArray } from './nao-form-array.class';
import { NaoFormOptions } from './nao-form-options';
import { NaoAbstractControlOptions } from './nao-form.interface';
import { NaoFormControl } from './nao-form-control.class';


export class NaoFormGroup<T = any> extends FormGroup {
  private schema;
  constructor(controls: {
      [key: string]: AbstractControl;
    }, options?: ValidatorFn | ValidatorFn[] | NaoFormOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controls, options, asyncValidator);
  }

  /**
   * Enable form after delay
   * @param delay
   * @param opts
   */
  public enableDelay(delay: number, opts?: NaoAbstractControlOptions): void {
    setTimeout(() => this.enable(opts), delay);
  }

  /**
   * Disable form after delay
   * @param delay
   * @param opts
   */
  public disableDelay(delay: number, opts?: NaoAbstractControlOptions): void {
    setTimeout(() => this.disable(opts), delay);
  }

  /**
   * Return only the values of abstract controls marked as `touched`
   */
  public getTouchedValues(): Partial<T> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'touched');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `untouched`
   */
  public getUntouchedValues(): Partial<T> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'untouched');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `dirty`
   */
  public getDirtyValues(): Partial<T> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'dirty');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `pristine`
   */
  public getPristineValues(): Partial<T> {
    // -->Get: only values markAs type
    const values = getValuesByMarkedAs(this, 'pristine');

    // -->Check: and return
    return values && values.ok ? values.value : null;
  }

  /**
   * Return only the values of abstract controls marked as `pending`
   */
  public getPendingValues(): Partial<T> {
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
  private markAs(formGroup: NaoFormGroup | NaoFormArray, type: 'touched' | 'untouched' | 'dirty' | 'pristine' | 'pending', options?: NaoAbstractControlOptions): void {
    // -->Call: markAs on self
    callNativeMarkAsFunction(formGroup, type, options);

    // -->Check: if it has controls
    if (formGroup && formGroup.hasOwnProperty('controls')) {
      // -->Loop: controls and execute
      mapValues(formGroup.controls, control => {
        if (control instanceof NaoFormGroup || control instanceof NaoFormArray) {
          this.markAs(control, type, options);
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
   * Get value of this shit
   */
  public getValue(): T {
    return super.getRawValue();
  }


  /**
   * Get object, but only keep the indexes I need
   */
  public getValues(...indexes: string[]): Partial<T> {
    const data = this.getValue();

    if (indexes.length === 0) {
      return data;
    } else {
      // -->Get: get each index
      let newData = {};
      // -->Check: if it's an object or array
      if (isPlainObject(data) || isArray(data)) {
        indexes.map(i => {
          // -->Set: data path in new object
          newData = set(newData, i, get(data, i) || null);
        });
        return newData as Partial<T>;
      } else {
        return data as T;
      }
    }
  }


  /**
   * Get value of this shit
   */
  public disable(opts?: NaoAbstractControlOptions): any {
    super.disable();
  }

  /**
   * Patch the data, deep
   */
  public patchDeep(data?: any) {
    if (data) {
      super.patchValue(data);
    }
  }

  /**
   * AJV validate
   */
  public validate(): boolean {
    return true;
  }

  /**
   * Add JSON schema with AJV
   * @param schema
   */
  public addJSONSchema(schema: any): boolean {
    this.schema = schema;
    return true;
  }

  /**
   * Add JSON schema with AJV
   * @param schema
   */
  public removeJSONSchema(schema: any): boolean {
    this.schema = null;
    return true;
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
   * Retrieves a child control given the control's name or path from a formGroup typecasted as NaoFormArray
   */
  public getAsNaoFormArray(path: Array<string | number> | string): NaoFormArray | null {
    const getValue = super.get(path);
    if (getValue && (getValue instanceof NaoFormArray)) {
      return getValue as NaoFormArray;
    }
    return null;
  }

  /**
   *  Retrieves a child control given the control's name or path from a formGroup typecasted as as NaoFormControl
   */
  public getAsNaoFormControl(path: Array<string | number> | string): NaoFormControl | null {
    const getValue = super.get(path);
    if (getValue && (getValue instanceof NaoFormControl)) {
      return getValue as NaoFormControl;
    }
    return null;
  }

  /**
   *  Retrieves a child control given the control's name or path from a formGroup typecasted as as NaoFormGroup
   */
  public getAsNaoFormGroup(path: Array<string | number> | string): NaoFormGroup | null {
    const getValue = super.get(path);
    if (getValue && (getValue instanceof NaoFormGroup)) {
      return getValue as NaoFormGroup;
    }
    return null;
  }

  /**
   * Retrieves a child control from a formGroup and returns only the value, not the entire object
   */
  public getValueFrom(path: Array<string | number> | string): Partial<T> {
    const getValue = super.get(path);
    if (getValue) {
      return getValue.value;
    }
    return null;
  }

   /**
   * Retrieves a child control from a formGroup and returns only the value, typecasted
   */
  public getValueFromAs<A>(path: Array<string | number> | string): Partial<A> | null {
    const getValueFrom = this.getValueFrom(path);
    if (getValueFrom) {
      return getValueFrom as A;
    }
    return null;
  }
}





