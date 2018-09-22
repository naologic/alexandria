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
import { NaoValidator } from '@naologic/forms'
```
##### Available Methods

*   `min()`
*   `max()`
*   `inArray()`
*   `inObjectKey()`
*   `inObject()`
*   `inEnum()`
*   `inEnumKey()`

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
        fruit: new FormControl(11, NaoValidator.min(7));
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
        fruit: new FormControl(11, NaoValidator.min(12));
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
        fruit: new FormControl('lemon', NaoValidator.inArray(this.arr));
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
        size: new FormControl('small', TestValidators.inObjectKey(this.obj));
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
        size: new FormControl('wallas', TestValidators.inObject(this.user, 'user.personalInfo.address.city'));
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
        size: new FormControl('SUN', TestValidators.inEnumKey(DaysOfWeek));
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
        size: new FormControl('Monday', TestValidators.inEnumKey(DaysOfWeek));
        // => Input validation will not pass, 'Monday' is a value of 'DaysOfWeek' enum Object.
    });
    console.log(DaysOfWeek);
    // => {SUN: "Sunday", MON: "Monday", TUE: "Tuesday"}
```
