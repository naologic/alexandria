import { AbstractControl, FormGroup } from '@angular/forms';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { isArray, mapValues, isPlainObject, set, get} from 'lodash';
import { callNativeMarkAsFunction, getValuesByMarkedAs, NaoFormStatic } from './nao-form-static.class';
import { NaoFormArray } from './nao-form-array.class';
import { NaoFormOptions } from './nao-form-options';
import { NaoAbstractControlOptions } from './nao-form.interface';
import { NaoFormControl } from './nao-form-control.class';



export class NaoFormGroup<T = any> extends FormGroup {
  private schema;
  private formData: {
    [index: string]: { data: FormData, contentLength: number }
  } = {};
  constructor(controls: {
      [key: string]: AbstractControl;
    }, options?: ValidatorFn | ValidatorFn[] | NaoFormOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controls, options, asyncValidator);
  }

  /**
   * Merge this form with another form
   */
  public merge(fg: NaoFormGroup, options = { overwrite: true }): void {
    if (fg && fg instanceof NaoFormGroup) {
      Object.keys(fg.value).map(k => {
        if (!this.contains(k) || (this.contains(k) && options.overwrite)) {
          this.setControl(k, fg.get(k));
        }
      });
    }
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
   * Check if form has errors
   */
  public hasErrors(): boolean {
    return this.getAllErrors() !== null;
  }

  /**
   * List the errors in a flat map
   */
  public getAllErrorsFlat() {
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
   *  Get data as FromData
   *  @experimental
   */
  public getAsFromData(path: Array<string | number> | string): FormData | null {
    const formData = new FormData();
    const value = this.getValue();

    for (const key of Object.keys(value) ) {
      formData.append(key, value[key]);
    }

    return formData;
  }

  /**
   * Retrieves a child control from a formGroup and returns only the value, not the entire object
   */
  public getValueFrom<A = any>(path: Array<string | number> | string): A {
    const getValue = super.get(path);
    if (getValue) {
      return getValue.value as A;
    }
    return null;
  }

  /**
   * Get file list form data
   */
  public getFormData(path: string): { data: FormData, contentLength: number } {
    return path ? this.formData[path] || null : null;
  }

  /**
   * Add files to form group
   */
  public setFormDataFiles(path: string, files: FileList): void {
    // -->Check: the form data
    if (!(this.formData[path] instanceof FormData)) {
      this.formData[path] = { data: new FormData(), contentLength: 0 };
    }

    // -->Set: files
    if (Object.keys(files).length > 0) {
      Object.keys(files).map(f => {
        // -->Set: files
        this.formData[path].data.append(`files`, files[f], files[f].name);
        // -->Length
        this.formData[path].contentLength += +files[f].size;
      });
    }
  }

  /**
   * Add form data to an existing FormData instance
   */
  public setFormData(path: string, data: any): void {
    // -->Check: the form data
    if (!(this.formData[path] instanceof FormData)) {
      this.formData[path] = { data: new FormData(), contentLength: 0 };
    }

    // -->Set: data
    if (data) {
      Object.keys(data).map(k => {
        // -->Append: data
        this.formData[path].data.append(k, data[k]);
      });
    }
  }

  /**
   * Remove form data
   */
  public removeFormData(path: string): void {
    if (path && this.formData[path]) {
      delete this.formData[path];
    }
  }

  /**
   * Resets the FormGroup, marks all descendants are marked pristine and untouched, and the value of all descendants to null.
   */
  public empty(options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void {
    return super.reset( {}, options );
  }
}





