# @naologic/forms from :fireworks: [Alexandria Library](https://github.com/naologic/alexandria)

__


## :page_with_curl: Install

```bash
npm install --save @naologic/forms
```

## Use

# NaoValidators

_Import the validators to your component_

```typescript 
import { NaoValidators } from '@naologic/forms'
```
##### Available Methods

*   `min()`
*   `max()`
*   `inArray()`
*   `inObjectKey()`
*   `inObject()`
*   `inEnum()`
*   `inEnumKey()`
*   `isSSN()`
*   `isUSZip()`
*   `isUSPhone()`
*   `solveOne()`
*   `solveSome()`
*   `solveNone()`
*   `solveAll()`
*   `isEmail()`
*   `maxLength()`
*   `minLength()`


# FormControl Validators

## **min()**
`min(value)`
_Validator that requires controls to have a value greater than a number._

##### Arguments

* `value(`_`number`_`)`  minimum value required.

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        fruit: new FormControl(11, NaoValidators.min(7));
        // => Input validation will pass, 11 is greater than 7
    });
```

***
## **max()**

`max(value)`
_Validator that requires controls to have a value less than a number._

##### Arguments

* `value(`_`number`_`)`  maximum value allowed.

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        fruit: new FormControl(11, NaoValidators.max(12));
        // => Input validation will pass, 11 is less than 12
    });
```

***
## **inArray()**

`inArray(array)`
_Validator that checks if control value exists in provided array_

##### Arguments

* `array(`_`Array`_`)`  The array to check.

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public arr = ['apple', 'orange', 'lemon', 'melon'];
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        fruit: new FormControl('lemon', NaoValidators.inArray(this.arr));
        // => Input validation will not pass, 'lemon' is an element of 'arr' Array
    });
```

***
## **inObjectKey()**

`inObjectKey(object)`
_Validator that checks if control value exists in provided object key_

##### Arguments

* `object(`_`Object`_`)`  The object to check.

##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    public obj = {
        small: 'S',  
        medium: 'M',
        large: 'L'
    };
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        size: new FormControl('small', NaoValidators.inObjectKey(this.obj));
        // => Input validation will not pass, 'small' is a key of 'obj' Object
    });
```

***
## **inObject()**

`inObject(object, path)`
_Validator that checks if control value exists in provided object_

##### Arguments

* `object(`_`Object`_`)`  The object to check.
* `path(`_`string`_`)`  Path to check (must not be empty).

##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    public user = {
    email: 'jack@dev.com',
    personalInfo: {
            name: 'Jack',
            address: {
                line1: 'westwish st',
                line2: 'washmasher',
                city: 'wallas',
                state: 'WX'
            }
        }
    }
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        size: new FormControl('wallas', NaoValidators.inObject(this.user, 'user.personalInfo.address.city'));
        // => Input validation will not pass, 'wallas' is a value of 'user' Object.
    });
    console.log(user.personalInfo.address.city);
    // => "wallas"
```
***
## **inEnumKey()**

`inEnumKey(EnumObj)`
_Validator that checks if control value exists in provided enum object_

##### Arguments

* `enumObj(`_`Object`_`)`  The enum object to check.

##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    enum DaysOfWeek { SUN, MON, TUE}
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        size: new FormControl('SUN', NaoValidators.inEnumKey(DaysOfWeek));
        // => Input validation will not pass, 'SUN' is a key of 'DaysOfWeek' enum Object.
    });
    console.log(DaysOfWeek);
    // => {0: "SUN", 1: "MON", 2: "TUE", SUN: 0, MON: 1, TUE: 2}
```

***
## **inEnum()**

`inEnum(EnumObj)`
_Validator that checks if the control value matches any of the enum values_

##### Arguments

* `enumObj(`_`Object`_`)`  The enum object to check.

##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    enum DaysOfWeek { SUN = 'Sunday', MON = 'Monday', TUE = 'Tuesday'}
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        size: new FormControl('Monday', NaoValidators.inEnum(DaysOfWeek));
        // => Input validation will not pass, 'Monday' is a value of 'DaysOfWeek' enum Object.
    });
    console.log(DaysOfWeek);
    // => {SUN: "Sunday", MON: "Monday", TUE: "Tuesday"}
```
***

## **isSSN()**

`isSSN()`
_Validator that checks if control value is a valid US SSN_

##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
        ssn: new FormControl('123 45 6789', NaoValidators.isSSN());
        //--> Input validation will pass
        // --> Accepted format 123 445 6789, 123-445-6789, 1234456789
    });
```

***
## **isUSZip()**

`isUSZip()`
_Validator that checks if control value is a valid format of US Zip Code_

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
         zip: new FormControl('65567', NaoValidators.isUSZip()),
        // => Input validation will pass
    });
```

***
## **isUSPhone()**

`isUSPhone()`
_Validator that checks if control value is a valid US Phone format_

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
         phone: new FormControl('123 445 6789', NaoValidators.isUSPhone()),
        // --> Input validation will pass
        // --> Accepted format  123 445 6789, 123-445-6789, 1234456789
    });
```

***

## **isEmail()**

`isEmail()`
_Validator that checks if control value is a valid email format_

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
         email: new FormControl('1_email@email.com', NaoValidators.isEmail()),
        // --> Input validation will pass
    });
```

***

## **maxLength()**

`maxLength(value)`
_Validator that checks if length of a string is less than a given number_

##### Arguments

* `value(`_`number`_`)`  maximum value required.

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
         userName: new FormControl('Honeybunch', NaoValidators.maxLength(30)),
        // --> Input validation will pass
    });
```

***

## **minLength()**

`minLength(value)`
_Validator that checks if length of a string is greater than a given number_

##### Arguments

* `value(`_`number`_`)`  minimum value required.

##### Returns

*   _ValidationErrors | null_

#### Example

```typescript
    public userForm: FormGroup;
    
    this.userForm = new FormGroup({
         userName: new FormControl('Honeybunch', NaoValidators.minLength(5)),
        // --> Input validation will pass
    });
```
***

# FormGroup Validators

***

## **solveOne()**

`solveOne(conditions)`
_Validator that checks if ONLY ONE condition is true_

##### Arguments

* `conditions(`_`Array`_`)`
 Multiple `Arrays` of `strings` following this format `[value_1, operator, value_2]`
 Available opertators `<, >, <=, >=, ==, !=`
 ex: `['name', '==', 'animals[0].type']`, `['weight', '!=', 'animals[0].weight']`
 Check the example below


##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    public groupForm: FormGroup;

    constructor( private fb: FormBuilder) {
       this.groupForm = this.fb.group({
         name: 'Tiger',
         weight: 85,
         animals: this.fb.array([
           this.fb.group({
             type: 'Tiger',
             weight: 85
           })
         ])
       }, { validator: NaoValidators.solveOne(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight']) });
        // --> Form validation will fail (both conditions are true)
        // -->  This will pass validation ex: NaoValidators.solveOne(['weight', '==', 'animals[0].weight'])
    }
```

***

## **solveSome()**

`solveSome(conditions)`
_Validator that checks if at least one condition is truee_

##### Arguments

* `conditions(`_`Array`_`)`
Multiple `Arrays` of `strings` following this format `[value_1, operator, value_2]`
Available opertators `<, >, <=, >=, ==, !=`
ex: `['name', '!=', 'animals[0].type']`, `['weight', '>', 'animals[0].weight']`
Check the example below


##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    public groupForm: FormGroup;

    constructor( private fb: FormBuilder) {
       this.groupForm = this.fb.group({
         name: 'Tiger',
         weight: 85,
         animals: this.fb.array([
           this.fb.group({
             type: 'Tiger',
             weight: 75
           })
         ])
       }, { validator: NaoValidators.solveSome(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight']) });
        // --> Form validation will pass, one of the conditions is true ['name', '==', 'animals[0].type']
    }
```

***

## **solveNone()**

`solveNone(conditions)`
_Validator that checks if NONE of the condition are true_

##### Arguments

* `conditions(`_`Array`_`)` 
 Multiple `Arrays` of `strings` following this format `[value_1, operator, value_2]`
Available opertators `<, >, <=, >=, ==, !=`
ex: `['name', '==', 'animals[0].type']`, `['weight', '<', 'animals[0].weight']`
Check the example below

##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    public groupForm: FormGroup;

    constructor( private fb: FormBuilder) {
       this.groupForm = this.fb.group({
         name: 'Tiger',
         weight: 85,
         animals: this.fb.array([
           this.fb.group({
             type: 'Tiger',
             weight: 75
           })
         ])
       }, { validator: NaoValidators.solveNone(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight']) });
        // --> Form validation will fail, one of the conditions is true ['name', '==', 'animals[0].type']
    }
```

***

## **solveAll()**

`solveAll(conditions)`
_Validator that checks if ALL condition are true_

##### Arguments

* `conditions(`_`Array`_`)`  
 Multiple `Arrays` of `strings` following this format `[value_1, operator, value_2]`
Available opertators `<, >, <=, >=, ==, !=`
ex: `['name', '!=', 'animals[0].type']`, `['weight', '>=', 'animals[0].weight']`
Check the example below

##### Returns

*   _ValidationErrors | null_

#### Example
```typescript
    public groupForm: FormGroup;

    constructor( private fb: FormBuilder) {
       this.groupForm = this.fb.group({
         name: 'Tiger',
         weight: 85,
         animals: this.fb.array([
           this.fb.group({
             type: 'Tiger',
             weight: 75
           })
         ])
       }, { validator: NaoValidators.solveAll(['name', '==', 'animals[0].type'], ['weight', '==', 'animals[0].weight']) });
         // --> Form validation will fail, only one condition is true ['name', '==', 'animals[0].type']
    }
```
***



# NaoFormGrop
***

_Import NaoFormGroup to your component_

```typescript 
import { NaoFormGroup } from '@naologic/forms'
```

##### Available Methods

*   `getValue()`
*   `getValues()`
*   `getValueFrom()`
*   `getTouchedValues()`
*   `getUntouchedValues()`
*   `getDirtyValues()`
*   `getPristineValues()`
*   `getPendingValues()`
*   `disable()`
*   `patchDeep()`
*   `validate()`
*   `addJSONSchema()`
*   `removeJSONSchema()`
*   `getAllErrors()`
*   `getAllErrorsFlat()`
*   `markAllAsTouched()`
*   `markAllAsUntouched()`
*   `markAllAsDirty()`
*   `markAllAsPristine()`
*   `markAllAsPending()`
*   `getAsNaoFormArray()`
*   `getAsNaoFormControl()`
*   `getAsNaoFormGroup()`
*   `empty()`


***
## **getValue()**

`getValue()`
_Get form values object_

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl('first'),
      second: new NaoFormControl('second'),
    });
    
   const formValues = this.naoFormGroup.getValue();
   console.log(formValues);
   // --> {first: "first", second: "second"}
   console.log(formValues.first);
   // --> first
```

***
## **getValues()**

`getValues(indexes)`
_Get specific form values_

##### Arguments

* `indexes(`_`string`_`)`  

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl('First control'),
      second: new NaoFormControl('Second control'),
      third: new NaoFormControl('Third control'),
    });
    
   const formValues = this.naoFormGroup.getValues('first', 'second');
   console.log(formValues);
   // --> {first: "First control", second: "Second control"}
```

***
## **getValueFrom()**

`getValueFrom()`
_Retrieves a child control from a formGroup and returns only the value, not the entire object. The return data can be typecasted_


##### Arguments

* `path(`_`string | Array<string | number>`_`)`  

##### Returns

*  _String | Array | Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

      
    const loginValue = this.naoFormGroup.getValueFrom('loginLog');
    console.log(loginValue);
   // --> [{id: "1", timestamp: 872634782348}, {id: "2", timestamp: 872634782348}, {id: "3", timestamp: 872634782348}]
   // -->Define a data interface
   interface LoginLog {
      id: string;
      timestamp: number;
    }
   // -->Typecast the return value
    const loginValueArray = this.naoFormGroup.getValueFrom<LoginLog[]>('loginLog');
    console.log(loginValueArray);
  // --> [{id: "1", timestamp: 872634782348}, {id: "2", timestamp: 872634782348}, {id: "3", timestamp: 872634782348}]
    const idValue =  loginValueArray[0].id;
    console.log(idValue);
   // --> 1
```

## **getTouchedValues()**

`getTouchedValues()`
_Get only the values of controls marked as `touched`_

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl('first'),
      second: new NaoFormControl('second'),
    });
    this.naoFormGroup.controls['first'].markAsTouched();

   const touchedValues = this.naoFormGroup.getTouchedValues();
   console.log(touchedValues);
   // --> {first: "first"}
```

## **getUntouchedValues()**

`getUntouchedValues()`
_Get only the values of controls marked as `untouched`_

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl('first'),
      second: new NaoFormControl('second'),
    });
    this.naoFormGroup.controls['second'].markAsTouched();

   const untouchedValues = this.naoFormGroup.getUntouchedValues();
   console.log(untouchedValues);
   // --> {first: "first"}
```

## **getDirtyValues()**

`getDirtyValues()`
_Get only the values of controls marked as `dirty`_

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl('first'),
      second: new NaoFormControl('second'),
    });
    this.naoFormGroup.controls['first'].markAsDirty();

   const dirtyValues = this.naoFormGroup.getDirtyValues();
   console.log(dirtyValues);
   // --> {first: "first"}
```

## **getPristineValues()**

`getPristineValues()`
_Get only the values of controls marked as `pristine`_

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl('first'),
      second: new NaoFormControl('second'),
    });
    this.naoFormGroup.controls['second'].markAsDirty();

   const pristineValues = this.naoFormGroup.getPristineValues();
   console.log(pristineValues);
   // --> {first: "first"}
```

## **getPendingValues()**

`getPendingValues()`
_Get only the values of controls marked as `pending`_

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl('first',  {asyncValidators: myAsyncValidator}),
      second: new NaoFormControl('second'),
    });
    
   const pendingValues = this.naoFormGroup.getPendingValues();
   console.log(pendingValues);
   // --> {first: "first"}
```

***

## **disable()**

`disable(opts)`
_Disables the control. This means the control is exempt from validation checks and excluded from the aggregate value of any parent. 
Its status is `DISABLED`._

##### Arguments

* `opts(`_`Object`_`)` - optional argument
   `opts` Configuration options that determine how the control propagates changes and emits events after the control is disabled.
   ```typescript
   {onlySelf?: boolean, emitEvent?: boolean}
   ```
   `onlySelf`: When `true`, mark only this control. When false or not supplied, marks all direct ancestors. Default is `false`..
  `emitEvent`: When `true` or not supplied (the default), both the `statusChanges` and `valueChanges` observables emit events with the latest status and value when the control is disabled.
  When `false`, no events are emitted.

##### Returns

*  _void_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      details: new NaoFormGroup({
        fullName: new NaoFormControl('John Doe'),
        // --> 'ssn' form control with invalid value
        ssn: new NaoFormControl('000 00 0000', Validators.minLength(20)),
      }),
      address: new NaoFormGroup({
        // --> 'zip' form control with invalid value
        zip: new NaoFormControl('00000', Validators.minLength(20)),
        street: new NaoFormControl('7821 Princess St.'),
      }),
    });
    
    // We exclude 'details' from Form validation check
   this.naoFormGroup.controls.details.disable();
   // Console log all Form errors
   console.log(this.naoFormGroup.getAllErrors());
   // --> { address: { zip: { ok: false, isUSZip: false, actualValue: "00000"} } }
```

## **disableDelay()**

`disableDelay(delay, opts)`
_Disables the control after delay 
Its status is `DISABLED`._

##### Arguments


* `delay(`_`number`_`)` 

* `opts(`_`Object`_`)` - optional argument
   `opts` Configuration options that determine how the control propagates changes and emits events after the control is disabled.
   ```typescript
   {onlySelf?: boolean, emitEvent?: boolean}
   ```
   `onlySelf`: When `true`, mark only this control. When false or not supplied, marks all direct ancestors. Default is `false`..
  `emitEvent`: When `true` or not supplied (the default), both the `statusChanges` and `valueChanges` observables emit events with the latest status and value when the control is disabled.
  When `false`, no events are emitted.

##### Returns

*  _void_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      details: new NaoFormGroup({
        fullName: new NaoFormControl('John Doe'),
        // --> 'ssn' form control with invalid value
        ssn: new NaoFormControl('000 00 0000', NaoValidators.isSSN()),
      }),
      address: new NaoFormGroup({
        // --> 'zip' form control with invalid value
        zip: new NaoFormControl('00000', NaoValidators.isUSZip()),
        street: new NaoFormControl('7821 Princess St.'),
      }),
    });
    
    // We exclude 'details' from Form validation check
   this.naoFormGroup.controls.details.disableDelay(1000);
   // Console log all Form errors
   setTimeout(() => console.log(this.naoFormGroup.getAllErrors()), 1000);
   
   // --> { address: { zip: { ok: false, isUSZip: false, actualValue: "00000"} } }
```

## **enableDelay()**

`disableDelay(delay, opts)`
_Enables the control after delay. This means the control is included in validation checks and the aggregate value of its parent. Its status recalculates based on its value and its validators. By default, if the control has children, all children are enabled
Its status is `ENABLED`._

##### Arguments


* `delay(`_`number`_`)` 

* `opts(`_`Object`_`)` - optional argument
   `opts` Configure options that control how the control propagates changes and emits events 
   ```typescript
   {onlySelf?: boolean, emitEvent?: boolean}
   ```
   `onlySelf`: When `true`, mark only this control. When false or not supplied, marks all direct ancestors. Default is `false`..
  `emitEvent`: When `true` or not supplied (the default), both the `statusChanges` and `valueChanges` observables emit events with the latest status and value when the control is disabled.
  When `false`, no events are emitted.

##### Returns

*  _void_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      details: new NaoFormGroup({
        fullName: new NaoFormControl('John Doe'),
        ssn: new NaoFormControl('000 00 0000', NaoValidators.isSSN()),
      }),
      address: new NaoFormGroup({
       zip: new NaoFormControl('00000', NaoValidators.isUSZip()),
        street: new NaoFormControl('7821 Princess St.'),
      }),
    });
    
    this.naoFormGroup.controls.details.disable();
    // We enable 'details' 
    this.naoFormGroup.enableDelay(1000);
   // Console log 
   setTimeout(()=> console.log(this.naoFormGroup.controls.details.enabled), 1000);
   // true
```
***

## **patchDeep()**

`patchDeep(data)`
_Patches the value of the `FormGroup`. It accepts an object with control names as keys, and does its best to match the values to the correct controls in the group._

##### Arguments

* `data(`_`any`_`)`

##### Returns

*  _void_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      first: new NaoFormControl(),
      last: new NaoFormControl(),
    });
    
    console.log(this.naoFormGroup.value);
   // --> {first: null, last: null}
   
   this.naoFormGroup.patchValue({first: 'Nancy'});
   console.log(this.naoFormGroup.value); 
   // --> {first: 'Nancy', last: null}
```

***

## **getAllErrors()**

`getAllErrors()`
_Get all errors from this form_

##### Returns

*  _null | object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      firstName: new NaoFormControl('John'),
      lastName: new NaoFormControl('Doe'),
      // -->  'ssn' Form control with invalid value
      ssn: new NaoFormControl('000 00 0000', NaoValidators.isSSN()),
    });
    
   const getFormErrors = this.naoFormGroup.getAllErrors();
   console.log(getFormErrors);
   // --> {first: {ok: false, isSSN: false, actualValue: "000 00 0000"}}
```

***

## **getAllErrorsFlat()**

`getAllErrorsFlat(path)`
_List the errors in a flat map_

##### Arguments

* `path(`_`string`_`)`

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      details: new NaoFormGroup({
        fullName: new NaoFormControl('John Doe'),
        // --> 'ssn' form control with invalid value
        ssn: new NaoFormControl('000 00 0000', NaoValidators.isSSN()),
      })
    });
    
   const getFormErrors = this.naoFormGroup.getAllErrors('details');
   console.log(getFormErrors);
   // --> {details.ssn: {ok: false, isSSN: false, actualValue: "000 00 0000"}}
```
***

***
## **getAsNaoFormGroup()**

`getAsNaoFormGroup()`
_Retrieves a child control given the control's name or path from a formGroup typecasted as as NaoFormGroup_


##### Arguments

* `path(`_`string | Array<string | number>`_`)`  

##### Returns

*  _NaoFormGroup Object_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

      
    const login = this.naoFormGroup.getAsNaoFormGroup('loginLog.0');
    console.log(login instanceof NaoFormGroup);
   // --> true
```

***
## **getAsNaoFormArray()**

`getAsNaoFormArray()`
_Retrieves a child control given the control's name or path from a formGroup typecasted as NaoFormArray_


##### Arguments

* `path(`_`string | Array<string | number>`_`)`  

##### Returns

*  _NaoFormArray_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

      
    const loginLog = this.naoFormGroup.getAsNaoFormArray('loginLog');
    console.log(loginLog instanceof NaoFormArray);
   // --> true
```

***
## **getAsNaoFormControl()**

`getAsNaoFormControl()`
_Retrieves a child control given the control's name or path from a formGroup typecasted as NaoFormControl_


##### Arguments

* `path(`_`string | Array<string | number>`_`)`  

##### Returns

*  _NaoFormControl_

#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

      
    const nameControl = this.naoFormGroup.getAsNaoFormControl('name');
    console.log(nameControl instanceof NaoFormControl);
   // --> true
```

***
## **markAllAsTouched()**

`markAllAsTouched()`
_Iterates through all the children of the NaoFormGroup and calls markAsTouched on all controls.  A control is touched by focus and blur events that do not change the value._


##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

      
    this.naoFormGroup.markAllAsTouched();
   console.log(this.testForm.controls.name.touched);
   // --> true
```

***
## **markAllAsUntouched()**

`markAllAsUntouched()`
_Iterates through all the children of the NaoFormGroup and calls markAsUntouched on all controls. If the control has any children, also marks all children as untouched and recalculates the touched status of all parent controls._


##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });
  
    this.naoFormGroup.markAllAsTouched();
   console.log(this.testForm.controls.name.touched);
   // --> true
    this.naoFormGroup.markAllAsUntouched();
   console.log(this.testForm.controls.name.touched);
   // --> false
```

***
## **markAllAsDirty()**

`markAllAsDirty()`
_Iterates through all the children of the NaoFormGroup and calls markAsDirty on all controls.  Marks the control as dirty. A control becomes dirty when the control's value is changed through the UI; compare markAsTouched._


##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

    this.naoFormGroup.markAllAsPristine();
   console.log(this.testForm.controls.name.dirty);
   // --> false
    this.naoFormGroup.markAllAsDirty();
   console.log(this.testForm.controls.name.dirty);
   // --> true
```

***
## **markAllAsPristine()**

`markAllAsPristine()`
_Iterates through all the children of the NaoFormGroup and calls markAsPristine on all controls. If the control has any children, marks all children as pristine, and recalculates the pristine status of all parent controls._


##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

  this.naoFormGroup.markAllAsDirty();
   console.log(this.testForm.controls.name.dirty);
   // --> true
    this.naoFormGroup.markAllAsPristine();
   console.log(this.testForm.controls.name.pristine);
   // --> true
```

***
## **markAllAsPending()**

`markAllAsPending()`
_Iterates through all the children of the NaoFormGroup and calls markAsPending on all controls.  A control is pending while the control performs async validation._


##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

    this.naoFormGroup.markAllAsPending();
   console.log(this.testForm.controls.name.pending);
   // --> true
```

***
## **empty()**

`empty()`
_Resets the FormGroup, marks all descendants are marked pristine and untouched, and the value of all descendants to null._


##### Arguments

* `options `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._
 `emitEvent`_When true or not supplied (the default), both the statusChanges and valueChanges observables emit events with the latest status and value when the control is reset. When false, no events are emitted_  



#### Example
```typescript
    public naoFormGroup: NaoFormGroup;

    this.naoFormGroup = new NaoFormGroup({
      name: new NaoFormControl(),
      loginLog: new NaoFormArray([
        new NaoFormGroup({
          id: new NaoFormControl('1'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('2'),
          timestamp: new NaoFormControl(872634782348)
        }),
        new NaoFormGroup({
          id: new NaoFormControl('3'),
          timestamp: new NaoFormControl(872634782348)
        })
      ])
   });

  this.naoFormGroup.empty();
   console.log(this.testForm.getValueFrom('loginLog.0'));
   // --> {id: null, timestamp: null}
    
```



# NaoFormArray

_Import NaoFormArray to your component_

```typescript 
import { NaoFormArray } from '@naologic/forms'
```

##### Available Methods

*   `getValue()`
*   `getValues()`
*   `getValueFrom()`
*   `getLast()`
*   `getAllErrors()`
*   `getAllErrorsFlat()`
*   `getTouchedValues()`
*   `getUntouchedValues()`
*   `getDirtyValues()`
*   `getPristineValues()`
*   `getPendingValues()`
*   `markAllAsTouched()`
*   `markAllAsUntouched()`
*   `markAllAsDirty()`
*   `markAllAsPristine()`
*   `markAllAsPending()`
*   `empty()`

***
## **getValue()**

`getValue()`
_Get form values ._

##### Returns

*  _Array_

#### Example
```typescript
     public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);


  const formValues = this.formArray.getValue();
  console.log(formValues);
   // --> ["first", "second"]
  
```

## **getValues()**

`getValues(indexes)`
_Get forma array values by index_

##### Arguments

* `indexes(`_`number`_`)`  

##### Returns

*  _Array_

#### Example
```typescript
     public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);


  const formValue = this.formArray.getValues(1);
  console.log(formValue);
   // --> ["second"]
  
```

## **getValueFrom()**

`getValueFrom()`
_Retrieves a child control from a formGroup and returns only the value, not the entire object. The return data can be typecasted_


##### Arguments

* `path: number`  

##### Returns

*  _String | Array | Object_

#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);

 
    console.log(this.formArray.getValueFrom(1);
  // --> 'second'
```



## **getLast()**

`getLast()`
_Get last item from FormArray_

##### Returns

*  _AbstractControl_

#### Example
```typescript
    public naoFormArray: NaoFormArray;

    this.naoFormArray =  new TestFormArray([
      new NaoFormControl('Control 1'),
      new NaoFormControl('Control 2'),
      new NaoFormControl('Control 3'),
    ]);
    const lastItem = this.naoFormArray.getLast();
    console.log(lastItem.value);
    // --> Control 3
```
***

## **getAllErrorsFlat()**

`getAllErrorsFlat(path)`
_List the errors in a flat map_

##### Arguments

* `path(`_`string`_`)` - Optional argument

##### Returns

*  _Object_

#### Example
```typescript
    public naoFormArray: NaoFormArray;

    this.naoFormArray =  new NaoFormArray([
      new NaoFormGroup({
        name: new NaoFormControl('John Doe'),
        // invalid ssn
        ssn: new NaoFormControl('00 000 0000', NaoValidators.isSSN()),
      }),
      new NaoFormGroup({
        name: new NaoFormControl('Jane Doe'),
        ssn: new NaoFormControl('34 544 7646', NaoValidators.isSSN()),
      })
    ]);
    
   console.log(this.naoFormArray.getAllErrorsFlat());
   // --> { [0].ssn: {ok: false, isSSN: false, actualValue: "000 00 0000"} }
```
***

## **getAllErrors()**

`getAllErrors()`
_Get all errors from this form_

##### Returns

*  _Object[]_

#### Example
```typescript
    public naoFormArray: NaoFormArray;

    this.naoFormArray =  new NaoFormArray([
      new NaoFormGroup({
        name: new NaoFormControl('John Doe'),
        // invalid ssn
        ssn: new NaoFormControl('00 000 0000', NaoValidators.isSSN()),
      }),
      new NaoFormGroup({
        name: new NaoFormControl('Jane Doe'),
        ssn: new NaoFormControl('34 544 7646', NaoValidators.isSSN()),
      })
    ]);
    
   console.log(this.naoFormArray.getAllErrors());
   // --> [{ 0: { ssn: {ok: false, isSSN: false, actualValue: "000 00 0000"}} }]
```

## **getTouchedValues()**

`getTouchedValues()`
_Get only the values of controls marked as `touched`_

##### Returns

*  _Array_

#### Example
```typescript
    public formArray: NaoFormArray;

    this.naoFormGroup = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);
      
    this.formArray.controls[0].markAsTouched();

   const touchedValues = this.formArray.getTouchedValues();
   console.log(touchedValues);
   // --> ["first"]
```

## **getUntouchedValues()**

`getUntouchedValues()`
_Get only the values of controls marked as `untouched`_

##### Returns

*  _Array_

#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);
    this.formArray.controls[1].markAsTouched();

   const untouchedValues = this.formArray.getUntouchedValues();
   console.log(untouchedValues);
     // --> ["first"]
```

## **getDirtyValues()**

`getDirtyValues()`
_Get only the values of controls marked as `dirty`_

##### Returns

*  _Array_

#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);
    this.formArray.controls[1].markAsDirty();

   const dirtyValues = this.formArray.getDirtyValues();
   console.log(dirtyValues);
     // --> ["second"]
```

## **getPristineValues()**

`getPristineValues()`
_Get only the values of controls marked as `pristine`_

##### Returns

*  _Array_

#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);
    this.formArray.controls[1].markAsDirty();

   const pristineValues = this.formArray.getPristineValues();
   console.log(pristineValues);
   // --> ["first"]
```

## **getPendingValues()**

`getPendingValues()`
_Get only the values of controls marked as `pending`_

##### Returns

*  _Array_

#### Example
```typescript
   public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);
    this.formArray.controls[1].markAsPending();
   const pendingValues = this.formArray.getPendingValues();
   console.log(pendingValues);
   // --> ["second"]
```

## **markAllAsTouched()**

`markAllAsTouched()`
_Iterates through all the children of the NaoFormArray and calls markAsTouched on all controls.  A control is touched by focus and blur events that do not change the value._


##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);

   this.formArray.markAllAsTouched();
  const touchedValues = this.formArray.getTouchedValues();
  console.log(touchedValues);
  // --> ["first", "second"]
    
```

## **markAllAsUntouched()**

`markAllAsUntouched()`
_Iterates through all the children of the NaoFormGroup and calls markAsUntouched on all controls. If the control has any children, also marks all children as untouched and recalculates the touched status of all parent controls._


##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);

 this.formArray.markAllAsTouched();
  console.log(this.formArray.touched);
  // --> true
  this.formArray.markAllAsUntouched();
  console.log(this.formArray.touched);
   // --> false
```

## **markAllAsDirty()**

`markAllAsDirty()`
_Iterates through all the children of the NaoFormGroup and calls markAsDirty on all controls.  Marks the control as dirty. A control becomes dirty when the control's value is changed through the UI; compare markAsTouched._

##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);

 this.formArray.markAllAsPristine();
  console.log(this.formArray.dirty);
  // --> false
  this.formArray.markAllAsDirty();
  console.log(this.formArray.dirty);
   // --> true
```

## **markAllAsPristine()**

`markAllAsPristine()`
_Iterates through all the children of the NaoFormGroup and calls markAsPristine on all controls. If the control has any children, marks all children as pristine, and recalculates the pristine status of all parent controls._

##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);

 this.formArray.markAllAsDirty();
  console.log(this.formArray.dirty);
  // --> true
  this.formArray.markAllAsPristine();
  console.log(this.formArray.pristine);
   // --> true
```

## **markAllAsPending()**

`markAllAsPending()`
_Iterates through all the children of the NaoFormGroup and calls markAsPending on all controls.  A control is pending while the control performs async validation._

##### Arguments

* `opts `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._  



#### Example
```typescript
    public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);

 this.formArray.markAllAsPending();
  console.log(this.formArray.pending);
  // --> true
```

## **empty()**

`empty()`
_Resets the FormArray and all descendants are marked pristine and untouched, and the value of all descendants to null or null maps._


##### Arguments

* `options `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._
 `emitEvent`_When true or not supplied (the default), both the statusChanges and valueChanges observables emit events with the latest status and value when the control is reset. When false, no events are emitted_  



#### Example
```typescript
     public formArray: NaoFormArray;

    this.formArray = new NaoFormArray([
    new NaoFormControl('first'),
    new NaoFormControl('second')
  ]);


  this.formArray.empty();
   console.log(this.formArray.controls.length);
   // --> 0
    
```


# NaoFormControl
***

_Import NaoFormControl to your component_

```typescript 
import { NaoFormControl } from '@naologic/forms'
```

##### Available Methods
*   `empty()`


## **empty()**

`empty()`
_Resets the form control, marking it pristine and untouched, and setting the value to null._


##### Arguments

* `options `_`Object`Configuration options that determine how the control propagates changes and emits events events after markin is applied_ 
 `onlySelf` _When true, mark only this control. When false or not supplied, marks all direct ancestors. Default is false._
 `emitEvent`_When true or not supplied (the default), both the statusChanges and valueChanges observables emit events with the latest status and value when the control is reset. When false, no events are emitted_  



#### Example
```typescript
    const control = new NaoFormControl('some value');
    console.log(control.value);    
    //  --> 'some value'
  control.empty();
   console.log(control.value);
   // --> null
    
```
***


### License 
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

_Made with :heart: in San Francisco :us:_ by [naologic](https://naologic.com)
