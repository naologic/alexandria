import {AbstractControl, AbstractControlOptions, FormGroup, FormArray} from '@angular/forms';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {isArray, keys, mapValues, isPlainObject, set, get} from 'lodash';
import {NaoFormStatic} from './nao-form-static.class';
import { NaoFormArray } from './nao-form-array.class';
import { NaoFormOptions } from './nao-form-options';


export class NaoFormGroup<T = any> extends FormGroup {
  private schema;
  constructor(controls: {
      [key: string]: AbstractControl;
    }, options?: ValidatorFn | ValidatorFn[] | NaoFormOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null 
  ) {
    super(controls, options, asyncValidator);    
  }

  public getValuesTouched(formGroup : NaoFormGroup | NaoFormArray , results: String[] = []) : String[]{

    mapValues(formGroup.controls,(control)=>{
      if (control instanceof NaoFormGroup || control instanceof NaoFormArray){
        this.getValuesTouched(control,results);
        }
      else if (control.touched){ 
          results.push(control.value);
        }
    });
    return results;
    }
 
  // https://github.com/naologic/alexandria/issues/20
  private markAs(formGroup: NaoFormGroup | NaoFormArray, type: 'touched' | 'untouched' | 'dirty' | 'pristine' | 'pending', options?: { onlySelf?: boolean, emitEvent?: boolean }): void {
    this.callNativeMarkAsFunction(formGroup, type, options);
    mapValues(formGroup.controls, (control) => {
      if (control instanceof NaoFormGroup || control instanceof NaoFormArray) {        
        this.markAs(control, type, options);
      }
      else {
        this.callNativeMarkAsFunction(control, type, options);
      }
    });
  }

  private callNativeMarkAsFunction( control: AbstractControl, type: 'touched'|'untouched'|'dirty'|'pristine'|'pending', options? : { onlySelf?:boolean, emitEvent?: boolean } ){
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
  public disable(opts?: { onlySelf?: boolean; emitEvent?: boolean; }): any {
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
}


