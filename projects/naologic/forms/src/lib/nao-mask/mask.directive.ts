import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from '@angular/forms';
import {Directive, EventEmitter, forwardRef, HostListener, Inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CurrencyPipe, DOCUMENT } from '@angular/common';

import { CustomKeyboardEvent } from './custom-keyboard-event';
import { config, IConfig, timeMasks, withoutValidation } from './config';
import { MaskService } from './mask.service';

// tslint:disable deprecation
@Directive({
  selector: '[naoMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaskDirective),
      multi: true,
    },
    MaskService,
  ],
})
export class MaskDirective implements ControlValueAccessor, OnChanges {
  @Input('naoMask') public maskExpression: string = '';
  @Input() public specialCharacters: IConfig['specialCharacters'] = [];
  @Input() public patterns: IConfig['patterns'] = {};
  @Input() public prefix: IConfig['prefix'] = '';
  @Input() public suffix: IConfig['suffix'] = '';
  @Input() public thousandSeparator: IConfig['thousandSeparator'] = ' ';
  @Input() public decimalMarker: IConfig['decimalMarker'] = '.';
  @Input() public dropSpecialCharacters: IConfig['dropSpecialCharacters'] | null = null;
  @Input() public hiddenInput: IConfig['hiddenInput'] | null = null;
  @Input() public showMaskTyped: IConfig['showMaskTyped'] | null = null;
  @Input() public placeHolderCharacter: IConfig['placeHolderCharacter'] | null = null;
  @Input() public shownMaskExpression: IConfig['shownMaskExpression'] | null = null;
  @Input() public showTemplate: IConfig['showTemplate'] | null = null;
  @Input() public clearIfNotMatch: IConfig['clearIfNotMatch'] | null = null;
  @Input() public validation: IConfig['validation'] | null = null;
  @Input() public separatorLimit: IConfig['separatorLimit'] | null = null;

  // Nao Custom Inputs
  @Output() public formattedValueChange = new EventEmitter();
  @Input() public options: IConfig['options']  = { valueFormatted: false };
  @Input() public currency: IConfig['currency'] = null;

  private _maskValue: string = '';
  private _inputValue!: string;
  private _position: number | null = null;
  private _start!: number;
  private _end!: number;
  private _code!: string;

  public constructor(
    @Inject(DOCUMENT) private document: any,
    private _maskService: MaskService,
    @Inject(config) protected _config: IConfig,
    private currencyPipe: CurrencyPipe
  ) {
  }

  public onChange = (_: any) => {};
  public onTouch = () => {};

  public ngOnChanges(changes: SimpleChanges): void {
    const {
      maskExpression,
      specialCharacters,
      patterns,
      prefix,
      suffix,
      thousandSeparator,
      decimalMarker,
      dropSpecialCharacters,
      hiddenInput,
      showMaskTyped,
      placeHolderCharacter,
      shownMaskExpression,
      showTemplate,
      clearIfNotMatch,
      validation,
      separatorLimit,
      options,
      currency
    } = changes;
    if (maskExpression) {
      this._maskValue = changes.maskExpression.currentValue || '';
    }
    if (specialCharacters) {
      if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
        return;
      } else {
        this._maskService.maskSpecialCharacters = changes.specialCharacters.currentValue || [];
      }
    }
    // Only overwrite the mask available patterns if a pattern has actually been passed in
    if (patterns && patterns.currentValue) {
      this._maskService.maskAvailablePatterns = patterns.currentValue;
    }
    if (prefix) {
      this._maskService.prefix = prefix.currentValue;
    }
    if (suffix) {
      this._maskService.suffix = suffix.currentValue;
    }
    if (thousandSeparator) {
      this._maskService.thousandSeparator = thousandSeparator.currentValue;
    }
    if (decimalMarker) {
      this._maskService.decimalMarker = decimalMarker.currentValue;
    }
    if (dropSpecialCharacters) {
      this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
    }
    if (hiddenInput) {
      this._maskService.hiddenInput = hiddenInput.currentValue;
    }
    if (showMaskTyped) {
      this._maskService.showMaskTyped = showMaskTyped.currentValue;
    }
    if (placeHolderCharacter) {
      this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
    }
    if (shownMaskExpression) {
      this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
    }
    if (showTemplate) {
      this._maskService.showTemplate = showTemplate.currentValue;
    }
    if (clearIfNotMatch) {
      this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
    }
    if (validation) {
      this._maskService.validation = validation.currentValue;
    }
    if (separatorLimit) {
      this._maskService.separatorLimit = separatorLimit.currentValue;
    }
    if (options) {
      this._maskService.options = options.currentValue;
    }
    if (currency) {
      this._maskService.currency = currency.currentValue;
    }

    this._applyMask();
  }

  // tslint:disable-next-line: cyclomatic-complexity
  public validate({ value }: FormControl): ValidationErrors | null {
    if (!this._maskService.validation) {
      return null;
    }
    if (this._maskService.ipError) {
      return this._createValidationError(value);
    }
    if (this._maskValue.startsWith('separator')) {
      return null;
    }
    if (withoutValidation.indexOf(this._maskValue) > -1) {
      return null;
    }
    if (this._maskService.clearIfNotMatch) {
      return null;
    }
    if (timeMasks.indexOf(this._maskValue) > -1) {
      return this._validateTime(value);
    }
    if (value && value.toString().length >= 1) {
      let counterOfOpt = 0;
      for (const key in this._maskService.maskAvailablePatterns) {
        if (
          this._maskService.maskAvailablePatterns[key].optional &&
          this._maskService.maskAvailablePatterns[key].optional === true
        ) {
          if (this._maskValue.indexOf(key) !== this._maskValue.lastIndexOf(key)) {
            const opt: string = this._maskValue
              .split('')
              .filter((i: string) => i === key)
              .join('');
            counterOfOpt += opt.length;
          } else if (this._maskValue.indexOf(key) !== -1) {
            counterOfOpt++;
          }
          if (this._maskValue.indexOf(key) !== -1 && value.toString().length >= this._maskValue.indexOf(key)) {
            return null;
          }
          if (counterOfOpt === this._maskValue.length) {
            return null;
          }
        }
      }
      if (
        this._maskValue.indexOf('{') === 1 &&
        value.toString().length === this._maskValue.length + Number(this._maskValue.split('{')[1].split('}')[0]) - 4
      ) {
        return null;
      }
      if (this._maskValue.indexOf('*') === 1 || this._maskValue.indexOf('?') === 1) {
        return null;
      } else if (
        (this._maskValue.indexOf('*') > 1 && value.toString().length < this._maskValue.indexOf('*')) ||
        (this._maskValue.indexOf('?') > 1 && value.toString().length < this._maskValue.indexOf('?')) ||
        this._maskValue.indexOf('{') === 1
      ) {
        return this._createValidationError(value);
      }
      if (this._maskValue.indexOf('*') === -1 || this._maskValue.indexOf('?') === -1) {
        const length: number = this._maskService.dropSpecialCharacters
          ? this._maskValue.length - this._maskService.checkSpecialCharAmount(this._maskValue) - counterOfOpt
          : this._maskValue.length - counterOfOpt;
        if (value.toString().length < length) {
          return this._createValidationError(value);
        }
      }
    }
    return null;
  }

  @HostListener('input', ['$event'])
  public onInput(e: CustomKeyboardEvent): void {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    this._inputValue = el.value;
    if (!this._maskValue) {
      this.onChange(el.value);
      return;
    }
    const position: number =
      el.selectionStart === 1
        ? (el.selectionStart as number) + this._maskService.prefix.length
        : (el.selectionStart as number);
    let caretShift = 0;
    let backspaceShift = false;
    this._maskService.applyValueChanges(position, (shift: number, _backspaceShift: boolean) => {
      caretShift = shift;
      backspaceShift = _backspaceShift;
    });
    // only set the selection if the element is active
    if (this.document.activeElement !== el) {
      return;
    }
    this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
    let positionToApply: number = this._position
      ? this._inputValue.length + position + caretShift
      : position + (this._code === 'Backspace' && !backspaceShift ? 0 : caretShift);
    if (positionToApply > this._getActualInputLength()) {
      positionToApply = this._getActualInputLength();
    }
    el.setSelectionRange(positionToApply, positionToApply);
    if ((this.maskExpression.indexOf('H') > -1 || this.maskExpression.indexOf('M') > -1) && caretShift === 0) {
      el.setSelectionRange((el.selectionStart as number) + 1, (el.selectionStart as number) + 1);
    }
    this._position = null;
  }

  @HostListener('blur')
  public onBlur(): void {
    this._maskService.clearIfNotMatchFn();
    this.onTouch();
  }

  @HostListener('click', ['$event'])
  public onFocus(e: MouseEvent | CustomKeyboardEvent): void {
    const el: HTMLInputElement = e.target as HTMLInputElement;
    const posStart = 0;
    const posEnd = 0;

    if (
      el !== null &&
      el.selectionStart !== null &&
      el.selectionStart === el.selectionEnd &&
      el.selectionStart > this._maskService.prefix.length &&
      // tslint:disable-next-line
      (e as any).keyCode !== 38
    )
      if (this._maskService.showMaskTyped) {
        // We are showing the mask in the input
        this._maskService.maskIsShown = this._maskService.showMaskInInput();
        if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
          // the input ONLY contains the mask, so position the cursor at the start
          el.focus();
          el.setSelectionRange(posStart, posEnd);
        } else {
          // the input contains some characters already
          if (el.selectionStart > this._maskService.actualValue.length) {
            // if the user clicked beyond our value's length, position the cursor at the end of our value
            el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
          }
        }
      }
    const nextValue: string | null =
      !el.value || el.value === this._maskService.prefix
        ? this._maskService.prefix + this._maskService.maskIsShown
        : el.value;

    /** Fix of cursor position jumping to end in most browsers no matter where cursor is inserted onFocus */
    if (el.value !== nextValue) {
      el.value = nextValue;
    }

    /** fix of cursor position with prefix when mouse click occur */
    if (((el.selectionStart as number) || (el.selectionEnd as number)) <= this._maskService.prefix.length) {
      el.selectionStart = this._maskService.prefix.length;
      return;
    }

    /** select only inserted text */
    if ((el.selectionEnd as number) > this._getActualInputLength()) {
      el.selectionEnd = this._getActualInputLength();
    }
  }

  // tslint:disable-next-line: cyclomatic-complexity
  @HostListener('keydown', ['$event'])
  public onKeyDown(e: CustomKeyboardEvent): void {
    this._code = e.code ? e.code : e.key;
    const el: HTMLInputElement = e.target as HTMLInputElement;
    this._inputValue = el.value;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'Delete') {
      if (e.key === 'Backspace' && el.value.length === 0) {
        el.selectionStart = el.selectionEnd;
      }
      if (e.key === 'Backspace' && (el.selectionStart as number) !== 0) {
        // If specialChars is false, (shouldn't ever happen) then set to the defaults
        this.specialCharacters = this.specialCharacters || this._config.specialCharacters;
        if (this.prefix.length > 1 && (el.selectionStart as number) <= this.prefix.length) {
          el.setSelectionRange(this.prefix.length, this.prefix.length);
        } else {
          if (this._inputValue.length !== (el.selectionStart as number) && (el.selectionStart as number) !== 1) {
            while (
              this.specialCharacters.indexOf(this._inputValue[(el.selectionStart as number) - 1].toString()) > -1 &&
              ((this.prefix.length >= 1 && (el.selectionStart as number) > this.prefix.length) ||
                this.prefix.length === 0)
            ) {
              el.setSelectionRange((el.selectionStart as number) - 1, (el.selectionStart as number) - 1);
            }
          }
          this.suffixCheckOnPressDelete(e.key, el);
        }
      }
      this.suffixCheckOnPressDelete(e.key, el);
      if (
        this._maskService.prefix.length &&
        (el.selectionStart as number) <= this._maskService.prefix.length &&
        (el.selectionEnd as number) <= this._maskService.prefix.length
      ) {
        e.preventDefault();
      }
      const cursorStart: number | null = el.selectionStart;
      // this.onFocus(e);
      if (
        e.key === 'Backspace' &&
        !el.readOnly &&
        cursorStart === 0 &&
        el.selectionEnd === el.value.length &&
        el.value.length !== 0
      ) {
        this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
        this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
      }
    }
    if (
      !!this.suffix &&
      this.suffix.length > 1 &&
      this._inputValue.length - this.suffix.length < (el.selectionStart as number)
    ) {
      el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
    } else if (
      (e.key === 'A' && e.ctrlKey === true) || // Ctrl+ A
      (e.key === 'A' && e.metaKey === true) // Cmd + A (Mac)
    ) {
      el.setSelectionRange(0, this._getActualInputLength());
      e.preventDefault();
    }
    this._maskService.selStart = el.selectionStart;
    this._maskService.selEnd = el.selectionEnd;
  }

  public suffixCheckOnPressDelete(key: string, el: HTMLInputElement): void {
    if (key === 'Delete' && this.suffix.length > 0) {
      if (this._inputValue.length - this.suffix.length <= (el.selectionStart as number)) {
        el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
      }
    }
    if (key === 'Backspace') {
      if (this.suffix.length > 1 && this._inputValue.length - this.suffix.length < (el.selectionStart as number)) {
        el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
      }
      if (this.suffix.length === 1 && this._inputValue.length === (el.selectionStart as number)) {
        el.setSelectionRange((el.selectionStart as number) - 1, (el.selectionStart as number) - 1);
      }
    }
  }

  @HostListener('ngModelChange', ['$event'])
  // tslint:disable-next-line: no-any
  public onModelChange(e: any): void {
    if (!e) {
      this._maskService.actualValue = '';
    }
    // // -->Emit: format value
    this.formatValue()
  }

  private formatValue() {
    if (this.options && this.options.valueFormatted) {
      if (this.currency) {
        // -->Get: formatted currency
        const formattedCurrency = this.currencyPipe.transform(
          this._maskService.actualValue,
          this.currency.code ? this.currency.code : null,
          this.currency.display ? this.currency.display : null,
          this.currency.digitsInfo ? this.currency.digitsInfo : null,
          this.currency.locale ? this.currency.locale : null
        );
        // -->Emit: the formatted currency
        this.formattedValueChange.emit(formattedCurrency);
      }
      // TODO: phone number formating
    }
  }

  private _repeatPatternSymbols(maskExp: string): string {
    return (
      (maskExp.match(/{[0-9]+}/) &&
        maskExp.split('').reduce((accum: string, currval: string, index: number): string => {
          this._start = currval === '{' ? index : this._start;

          if (currval !== '}') {
            return this._maskService._findSpecialChar(currval) ? accum + currval : accum;
          }
          this._end = index;
          const repeatNumber: number = Number(maskExp.slice(this._start + 1, this._end));
          const repaceWith: string = new Array(repeatNumber + 1).join(maskExp[this._start - 1]);
          return accum + repaceWith;
        }, '')) ||
      maskExp
    );
  }
  // tslint:disable-next-line:no-any
  private _applyMask(): any {
    this._maskService.maskExpression = this._repeatPatternSymbols(this._maskValue || '');
    this._maskService.formElementProperty = [
      'value',
      this._maskService.applyMask(this._inputValue, this._maskService.maskExpression),
    ];
  }

  private _validateTime(value: string): ValidationErrors | null {
    const rowMaskLen: number = this._maskValue.split('').filter((s: string) => s !== ':').length;
    if (value === null || value.length === 0) {
      return null; // Don't validate empty values to allow for optional form control
    }

    if ((+value[value.length - 1] === 0 && value.length < rowMaskLen) || value.length <= rowMaskLen - 2) {
      return this._createValidationError(value);
    }

    return null;
  }

  private _getActualInputLength() {
    return (
      this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length
    );
  }

  private _createValidationError(actualValue: string): ValidationErrors {
    return {
      mask: {
        requiredMask: this._maskValue,
        actualValue,
      },
    };
  }

  /** It writes the value in the input */
  public async writeValue(inputValue: string | number): Promise<void> {
    if (inputValue === undefined) {
      inputValue = '';
    }
    if (typeof inputValue === 'number') {
      inputValue = String(inputValue);
      inputValue = this.decimalMarker !== '.' ? inputValue.replace('.', this.decimalMarker) : inputValue;
      this._maskService.isNumberValue = true;
    }
    (inputValue && this._maskService.maskExpression) ||
    (this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped))
      ? (this._maskService.formElementProperty = [
        'value',
        this._maskService.applyMask(inputValue, this._maskService.maskExpression),
      ])
      : (this._maskService.formElementProperty = ['value', inputValue]);
    this._inputValue = inputValue;

    // -->Emit: format value
    this.formatValue();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
    this._maskService.onChange = this.onChange;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /** It disables the input element */
  public setDisabledState(isDisabled: boolean): void {
    this._maskService.formElementProperty = ['disabled', isDisabled];
  }
}