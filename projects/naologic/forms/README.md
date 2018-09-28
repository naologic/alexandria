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
        fruit: new FormControl(11, NaoValidators.min(12));
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
*   `disable()`
*   `patchDeep()`
*   `validate()`
*   `addJSONSchema()`
*   `removeJSONSchema()`
*   `getAllErrors()`
*   `getAllErrorsFlat()`

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

`getValue(indexes)`
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
        ssn: new NaoFormControl('000 00 0000', NaoValidators.isSSN()),
      }),
      address: new NaoFormGroup({
        // --> 'zip' form control with invalid value
        zip: new NaoFormControl('00000', NaoValidators.isUSZip()),
        street: new NaoFormControl('7821 Princess St.'),
      }),
    });
    
    // We exclude 'details' from Form validation check
   this.naoFormGroup.controls.details.disable();
   // Console log all Form errors
   console.log(this.naoFormGroup.getAllErrors());
   // --> { address: { zip: { ok: false, isUSZip: false, actualValue: "00000"} } }
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

# NaoFormArray

_Import NaoFormArray to your component_

```typescript 
import { NaoFormArray } from '@naologic/forms'
```

##### Available Methods

*   `getLast()`
*   `getAllErrors()`
*   `getAllErrorsFlat()`

***

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
***
