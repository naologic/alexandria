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
