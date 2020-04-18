import { FormControl } from '@angular/forms';
import { AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import { NaoFormOptions } from './nao-form-options';
import { cloneAbstractControl, NaoFormStatic } from './nao-form-static.class';
import { BehaviorSubject } from 'rxjs';
import { isPlainObject, pick, merge } from 'lodash';

export class NaoFormControl extends FormControl {
  public metadata$ = new BehaviorSubject<any>(null);
  constructor(
    formState?: any,
    options?: ValidatorFn | ValidatorFn[] | NaoFormOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
    meta?: any
  ) {
    super(formState, options, asyncValidator);
    // -->Set: meta
    if (meta) {
      this.setMetadata(meta);
    }
  }

  /**
   * Get metadata
   * @example
   *    form.getMetadata('value')
   *    form.getMetadata()
   */
  public getMetadata(...indexes: string[]): any {
    if (Array.isArray(indexes) && indexes.length) {
      return pick(this.metadata$.getValue(), indexes);
    }
    return this.metadata$.getValue();
  }

  /**
   * Set metadata
   * @example
   *    form.setMetadata({ value: 'Pied Piper', ceo: 'Richard Hendrix' })
   */
  public setMetadata(meta, mergeData = false): NaoFormControl {
    if (!isPlainObject(meta)) {
      throw new Error(`Metadata must be an object. Ex: { value: 'Pied Piper' }`);
    }
    this.metadata$.next(mergeData ? merge({}, meta, this.metadata$.getValue()) : meta);
    return this;
  }

  /**
   * List the keys
   *    @example
   *      formControl.listMetadataKeys() --> ['value', 'ceo']
   */
  public listMetadataKeys(): string[] {
    return Object.keys(this.metadata$.getValue() || {});
  }

  /**
   * Clear the keys
   *    @example
   *      formControl.clearMetadataKeys()
   */
  public clearMetadata(): NaoFormControl {
    this.metadata$.next(null);
    return this;
  }

  /**
   * Resets the form control, marking it pristine and untouched, and setting the value to null.
   */
  public empty(options: { onlySelf?: boolean; emitEvent?: boolean; } = {}): void {
    return super.reset(null, options);
  }

  /**
   * Get all errors
   */
  public getAllErrors() {
    return NaoFormStatic.getAllErrors(this);
  }

  /**
   * Check if control has errors
   */
  public hasErrors(): boolean {
    return this.getAllErrors() !== null;
  }

  /**
   * Check if value is greater then formControl value
   * @param value
   */
  public gt(value: number): boolean {
    return !isNaN(+this.value) ? this.value > value : false;
  }

  /**
   * Check if value is less then formControl value
   * @param value
   */
  public lt(value: number): boolean {
    return !isNaN(+this.value) ? this.value < value : false;
  }

  /**
   * Check if value is equal with the formControl value
   * @param value
   */
  public eq(value: string | number | boolean): boolean {
    return this.value === value;
  }

  /**
   * Check if value is greater or equal then formControl value
   * @param value
   */
  public gte(value: number): boolean {
    return !isNaN(+this.value) ? this.value >= value : false;
  }

  /**
   * Check if value is less or equal then formControl value
   * @param value
   */
  public lte(value: number): boolean {
    return !isNaN(+this.value) ? this.value <= value : false;
  }

  /**
   * Check if value is not equal with formControl value
   * @param value
   */
  public not(value: string | number | boolean): boolean {
    return this.value !== value;
  }

  /**
   * Clone the current formControl
   */
  public clone(reset = false) {
    const fc = cloneAbstractControl(this);
    if (reset) {
      fc.reset({ onlySelf: false, emitEvent: false });
    }
    return fc;
  }
}
