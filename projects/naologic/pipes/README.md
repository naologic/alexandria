# @naologic/forms from :fireworks: [Alexandria Library](https://github.com/naologic/alexandria)

__


## :page_with_curl: Install

```bash
npm install --save @naologic/forms
```

## Use

# NaoPipes
_Import NaoPipesModule to your module_

```typescript 
import { NaoPipesModule } from '@naologic/pipes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NaoPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
# Collections (array)
***

*   `empty`
*   `head`
*   `initial`
*   `join`
*   `last`
*   `tail`
*   `uniq`
*   `without`
*   `intersection`
*   `union`
*   `range`
*   `map`
*   `pluck`
*   `where`
*   `firstOrDefault`
*   `orderBy`
*   `reverse`
*   `count`
*   `some`
*   `every`
*   `shuffle`
*   `take`
*   `takeUntil`
*   `takeWhile`
*   `drop`
*   `deep`
*   `chunk`
*   `flatten`

## **empty**
Returns true if the collection is empty.

#### Import

```typescript
import { EmptyPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [] | empty }} <!-- true -->
    {{ [1, 2, 3] | empty }} <!-- false -->
```

## **head**
Returns the first element of the collection, or undefined if the collection is empty.

#### Import

```typescript
import { HeadPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [] | head }} <!-- undefined -->
    {{ [1, 2, 3] | head }} <!-- 1 -->
```

## **initial**
Returns every element but the last of the collection or empty array if the collection is empty.

#### Import

```typescript
import { InitialPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [] | initial }} <!-- [] -->
    {{ [1, 2, 3] | initial }} <!-- [1, 2] -->
```

## **join**
Joins an array into a string.

#### Import

```typescript
import { JoinPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [] | join }} <!-- '' -->
    {{ ['a', 'b', 'c'] | join }} <!-- 'abc' -->
    {{ ['a', 'b', 'c'] | join: '0' }} <!-- 'a0b0c' -->
```

## **last**
Returns the last element of the collection or undefined if the collection is empty.

#### Import

```typescript
import { LastPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [] | last }} <!-- undefined -->
    {{ ['a', 'b', 'c'] | last }} <!-- 'c' -->
```

## **tail**
Returns every elements but the first of the collection or empty array if the collection is empty.

#### Import

```typescript
import { TailPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [] | tail }} <!-- [] -->
    {{ ['a', 'b', 'c'] | tail }} <!-- ['b', 'c'] -->
```

## **uniq**
Returns the collection keeping only one duplicate.

#### Import

```typescript
import { UniqPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [] | uniq }} <!-- [] -->
    {{ ['a', 'b', 'a'] | uniq }} <!-- ['a', 'b'] -->
```

## **without**
Returns the collection without the specified elements.

#### Import

```typescript
import { WithoutPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3] | without: [1, 3] }} <!-- [2] -->
```

## **intersection**
Returns the intersection of two collection, works with deep equal.

#### Import

```typescript
import { IntersectionPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3] | intersection: [1, 2] }} <!-- [1, 2] -->
    {{ [1, 2, 3] | intersection: [1, 2, 2] }} <!-- [1, 2] it does not take duplicates -->
    {{ [1, 2] | intersection: [3, 4] }} <!-- [] -->
    {{ [{ a: 1 }, { a: 2 }] | intersection: [{ a: 1 }, { a: 3 }] }} <!-- [] (no deep here)-->
    {{ [{ a: 1 }, { a: 2 }] | deep | intersection: [{ a: 1 }, { a: 3 }] }} <!-- [{a: 1}] -->
```

## **union**
Returns the union of two collection, works with deep equal.

#### Import

```typescript
import { UnionPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3] | union: [1, 2] }} <!-- [1, 2, 3] -->
    {{ [1, 2] | union: [3, 4] }} <!-- [1, 2, 3, 4] -->
    {{ [{ a: 1 }, { a: 2 }] | union: [{ a: 1 }, { a: 3 }] }} <!-- [{ a: 1 }, { a: 2 }, { a: 1 }, { a: 3 }] (no deep here)-->
    {{ [{ a: 1 }, { a: 2 }] | deep | union: [{ a: 1 }, { a: 3 }] }} <!-- [{ a: 1 }, { a: 2 }, { a: 3 }] -->
```

## **range**
Returns a range of number with a given size (default: 0) and start (default: 1).
The value on the left hand size does not matter, it is ignored.

#### Import

```typescript
import { RangePipe } from '@naologic/pipes';
```

#### Example

```typescript
    <!-- {{ [] | range: size : start }} -->
    {{ [] | range: 3: 1 }} <!-- [1, 2, 3] -->
    {{ [] | range: 5: 0 }} <!-- [0, 1, 2, 3, 4] -->
    {{ [] | range: 5: -2 }} <!-- [-2, -1, 0, 1, 2] -->
```

## **map**
Returns the collection that is passed through a map function. If no function is provided, the collection is returned unchanged.

#### Import

```typescript
import { MapPipe } from '@naologic/pipes';
```

#### Example

```typescript
    // ...
        addOne (item) {
            return item + 1;
        }
    // ...
    {{ [1, 2, 3] | map: addOne }} <!-- [2, 3, 4] -->
```

## **pluck**
Returns an array of the given property of the object in the array.

#### Import

```typescript
import { PluckPipe } from '@naologic/pipes';
```

#### Example

```typescript
    // ...

    const values = [{
        a: 1,
        c: {
            d: 3,
            e: {
                f: 4
            }
        }
    }, {
        a: 2,
        c: {
            d: 4,
            e: {
                f: 5
            }
        }
    }];
    
    // ...
    
    {{ values | pluck: 'a' }} <!-- [1, 2] -->
    {{ values | pluck: 'c.d' }} <!-- [3, 4] -->
    {{ values | pluck: 'c.e.f' }} <!-- [4, 5] -->
    {{ values | pluck: 'c.e.f.g' }} <!-- [undefined, undefined] -->
```

## **where**
Filter an array with a given function or a property shorthand.

#### Import

```typescript
import { WherePipe } from '@naologic/pipes';
```

#### Example

```typescript
   // ...

    const values = [{
        a: 1,
        c: {
            d: 3,
            e: {
                f: 4
            }
        }
    }, {
        a: 2,
        c: {
            d: 4,
            e: {
                f: 5
            }
        }
    }];
    
    const numbers = [1, 2, 3, 4, 1, 4];
    
    // ...
    
    aEqualsOne(item) {
        return item.a === 1;
    }
    
    {{ values | where: aEqualsOne }} <!-- [{ a: 1, c: { d: 3, e: { f: 4 } }] -->
    {{ values | where: ['a', 1] }}   <!-- [{ a: 1, c: { d: 3, e: { f: 4 } }] -->
    {{ values | where: ['c.e.f', 4] }}   <!-- [{ a: 1, c: { d: 3, e: { f: 4 } }] -->
    {{ numbers | where: 1 }}   <!-- [1, 1] -->
```

## **firstOrDefault**
This pipe behaves exactly like where but only return the first element when is found. A default value can be provided if no such element exists.

#### Import

```typescript
import { FirstOrDefaultPipe } from '@naologic/pipes';
```

#### Example

```typescript
   // ...

    const values = [{
        a: 1,
        c: {
            d: 3,
            e: {
                f: 4
            }
        }
    }, {
        a: 2,
        c: {
            d: 4,
            e: {
                f: 5
            }
        }
    }];
    
    const numbers = [1, 2, 3, 4, 1, 4];
    
    // ...
    
    aEqualsOne(item) {
        return item.a === 1;
    }
    
    {{ values | firstOrDefault: aEqualsOne }} <!-- { a: 1, c: { d: 3, e: { f: 4 } }]-->
    {{ values | firstOrDefault: ['a', 1] }}   <!-- { a: 1, c: { d: 3, e: { f: 4 } } -->
    {{ values | firstOrDefault: ['c.e.f', 4] }}   <!-- { a: 1, c: { d: 3, e: { f: 4 } } -->
    {{ numbers | firstOrDefault: 1 }}   <!-- 1 -->
    {{ numbers | firstOrDefault: 5 : 42 }}   <!-- 42 -->
    {{ numbers | firstOrDefault: 5 }}   <!-- undefined -->
```

## **orderBy**
Returns a new ordered array. You can order by multiple properties, ascending and descending.

#### Import

```typescript
import { OrderByPipe } from '@naologic/pipes';
```

#### Example

```typescript
 const values = [
        { a: 1, b: 2 },
        { a: 2, b: 1 },
        { a: 5, b: 3 },
        { a: 4, b: 8 }
 ]
 
 {{ [1, 4, 3, 2] | orderBy }} <!-- [1, 2, 3, 4] -->
 {{ [1, 4, 3, 2] | orderBy: '-' }} <!-- [4, 3, 2, 1] -->
 {{ values | orderBy: 'a' }} <!-- Will order the values by a (asc) -->
 {{ values | orderBy: '+a' }} <!-- Will order the values by a (asc)-->
 {{ values | orderBy: ['a'] }} <!-- Will order the values by a (asc)-->
 {{ values | orderBy: '-a' }} <!-- Will order the values by a (desc)-->
 {{ values | orderBy: ['-a', 'b'] }} <!-- Will order the values by a (desc) and b (asc) -->
 {{ values | orderBy: ['-a', '+b'] }} <!-- Will order the values by a (desc) and b (asc) -->
 {{ values | orderBy: ['-a', '-b'] }} <!-- Will order the values by a (desc) and b (desc) -->
```

## **reverse**
Returns a reversed array.

#### Import

```typescript
import { ReversePipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3, 4] | reverse }} <!-- [4, 3, 2, 1] -->
```

## **count**
Returns the length of the collection. Useful when used with other pipes, otherwise, use the length property. Works also for object and string.

#### Import

```typescript
import { CountPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3, 4] | count }} <!-- 4 -->
```

## **some**
Returns true if at least one of the item in the collections pass the predicate.

#### Import

```typescript
import { SomePipe } from '@naologic/pipes';
```

#### Example

```typescript
    const predicate = function (item) {
        return item === 2;
    };
    
    {{ [1, 2, 3, 4] | some: predicate }} <!-- true -->
    {{ [1, 3, 3, 4] | some: predicate }} <!-- false -->
```

## **every**
Returns true if every item in the collections pass the predicate.

#### Import

```typescript
import { EveryPipe } from '@naologic/pipes';
```

#### Example

```typescript
    const predicate = function (item) {
        return item === 2;
    };
    
    {{ [1, 2, 3, 4] | every: predicate }} <!-- false -->
    {{ [2, 2, 2, 2] | every: predicate }} <!-- true -->
```


## **shuffle**
Shuffles a collection.

#### Import

```typescript
import { ShufflePipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3] | shuffle }} <!-- random order... -->
```

## **take**
Take the top n items of an array.

#### Import

```typescript
import { TakePipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3, 4] | take }} <!-- [1] -->
    {{ [1, 2, 3, 4] | take: 2 }} <!-- [1, 2] -->
```

## **takeUntil**
Take until the condition is met.

#### Import

```typescript
import { TakeUntilPipe } from '@naologic/pipes';
```

#### Example

```typescript
    function predicate (item: any) {
        return item >= 4;
    }
    
    {{ [1, 2, 3, 4] | takeUntil: predicate }} <!-- [1, 2, 3] -->
```

## **takeWhile**
Take while the condition is met.

#### Import

```typescript
import { TakeWhilePipe } from '@naologic/pipes';
```

#### Example

```typescript
    function predicate (item: any) {
        return item < 4;
    }
    
    {{ [1, 2, 3, 4] | takeWhile }} <!-- [1, 2, 3] -->
```

## **drop**
Drop the last n items of an array.

#### Import

```typescript
import { DropPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3, 4] | drop }} <!-- [2, 3, 4] -->
    {{ [1, 2, 3, 4] | drop: 2 }} <!-- [3, 4] -->
```

## **deep**
The `deep` pipe is different from other pipes, it doesn't return new data. It wraps data for other pipes to work with deep comparaisons.

#### Import

```typescript
import { DeepPipe } from '@naologic/pipes';
```

#### Example

```typescript
    collection: any[] = [
        { a: 1, b: { c: 2 } },
        { a: 1, b: { c: 2 } },
        { a: 1, b: { c: 3 } },
    ];
    
    {{ collection | uniq }} <!-- The all collection (deep equal not working) -->
    {{ collection | deep | uniq }} <!-- [{ a: 1, b: { c: 3 } }] -->
```

## **chunk**
The `chunk` pipe breaks the array into multiple, smaller arrays of a given size:

#### Import

```typescript
import { ChunkPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [1, 2, 3, 4] | chunk }} <!-- [[1],[2], [3], [4]] -->
    {{ [1, 2, 3, 4] | chunk: 2 }} <!-- [[1, 2], [3, 4]] -->
```

## **flatten**
The `flatten` flattens an array. It can be used with the `deep` pipe.

#### Import

```typescript
import { FlattenPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ [[1, 2, 3, 4]] | flatten }} <!-- [1, 2, 3, 4] -->
    {{ [[1, 2, 3, [4]] | flatten }} <!-- [1, 2, 3, [4]] -->
    {{ [[1, 2, 3, [4]] | deep | flatten }} <!-- [1, 2, 3, 4] -->
```


# Boolean
***

* `greater`
* `greaterOrEqual`
* `less`
* `lessOrEqual`
* `equal`
* `notEqual`
* `identical`
* `notIdentical`
* `isNull`
* `isUndefined`
* `isNil`
* `isNumber`
* `isString`
* `isFunction`
* `isArray`
* `isObject`
* `isDefined`


## **greater**
Returns true if the first value is greater than the second value.

#### Import

```typescript
import { IsGreaterPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | greater: 1 }} <!-- false -->
    {{ 1 | greater: 0 }} <!-- true -->
    {{ 1 | greater: 1 }} <!-- false -->
```

## **greaterOrEqual**
Returns true if the first value is greater or equal to the second value.

#### Import

```typescript
import { IsGreaterOrEqualPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | greaterOrEqual: 1 }} <!-- false -->
    {{ 1 | greaterOrEqual: 0 }} <!-- true -->
    {{ 1 | greaterOrEqual: 1 }} <!-- true -->
```

## **less**
Returns true if the first value is less than the second value.

#### Import

```typescript
import { IsLessPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | less: 1 }} <!-- true -->
    {{ 1 | less: 0 }} <!-- false -->
    {{ 1 | less: 1 }} <!-- false -->
```

## **lessOrEqual**
Returns true if the first value is less or equal to the second value.

#### Import

```typescript
import { IsLessOrEqualPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | lessOrEqual: 1 }} <!-- true -->
    {{ 1 | lessOrEqual: 0 }} <!-- false -->
    {{ 1 | lessOrEqual: 1 }} <!-- true -->
```

## **equal**
Returns true if the value are equal (operator `==`).

#### Import

```typescript
import { IsEqualPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | equal: 1 }} <!-- false -->
    {{ 1 | equal: '1' }} <!-- true -->
    {{ 1 | equal: 1 }} <!-- true -->
```

## **notEqual**
Returns true if the value are not equal (operator `!=`).

#### Import

```typescript
import { IsNotEqualPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | notEqual: 1 }} <!-- true -->
    {{ 1 | notEqual: '1' }} <!-- false -->
    {{ 1 | notEqual: 1 }} <!-- false -->
```

## **identical**
Returns true if the value are identical (operator `===`).

#### Import

```typescript
import { IsIdenticalPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | identical: 1 }} <!-- false -->
    {{ 1 | identical: '1' }} <!-- false -->
    {{ 1 | identical: 1 }} <!-- true -->
```

## **notIdentical**
Returns true if the value are not identical (operator `!==`).

#### Import

```typescript
import { IsNotIdenticalPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 0 | notIdentical: 1 }} <!-- true -->
    {{ 1 | notIdentical: '1' }} <!-- true -->
    {{ 1 | notIdentical: 1 }} <!-- false -->
```

## **isNull**
Returns true if the value if null.

#### Import

```typescript
import { IsNullPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ null | isNull }} <!-- true -->
    {{ 1 | isNull }} <!-- false -->
```

## **isUndefined**
Returns true if the value if undefined.

#### Import

```typescript
import { IsUndefinedPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ a | isUndefined }} <!-- true if a does not exists -->
    {{ 1 | isUndefined }} <!-- false -->
```

## **isNil**
Returns true if the value if null or undefined.

#### Import

```typescript
import { IsNilPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ a | isNil }} <!-- true if a does not exists -->
    {{ null | isNil }} <!-- true -->
    {{ 1 | isNil }} <!-- false -->
```

## **isNumber**
Returns true if the value is a number.

#### Import

```typescript
import { IsNumberPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'a' | isNumber }} <!-- false -->
    {{ 1 | isNumber }} <!-- true -->
```

## **isString**
Returns true if the value is a string.

#### Import

```typescript
import { IsStringPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'a' | isString }} <!-- true -->
    {{ 1 | isString }} <!-- false -->
```

## **isFunction**
Returns true if the value is a function.

#### Import

```typescript
import { IsFunctionPipe } from '@naologic/pipes';
```

#### Example

```typescript
    myFn() {
        // ...
    }
    
    {{ 'a' | isFunction }} <!-- false -->
    {{ myFn | isFunction }} <!-- true -->
```

## **isArray**
Returns true if the value is an array.

#### Import

```typescript
import { IsArrayPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'a' | isArray }} <!-- false -->
    {{ [] | isArray }} <!-- true -->
```

## **isObject**
Returns true if the value is an object.

#### Import

```typescript
import { IsObjectPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'a' | isObject }} <!-- false -->
    {{ {} | isObject }} <!-- true -->
```

## **isDefined**
Returns true if the value is defined (nor null nor undefined).

#### Import

```typescript
import { IsDefinedPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'a' | isDefined }} <!-- true -->
    {{ null | isDefined }} <!-- false -->
    {{ a | isDefined }} <!-- false if a does not exists -->
```

# Math
***

* `bytes`
* `ceil`
* `floor`
* `round`
* `degrees`
* `radians`
* `random`
* `pow`
* `sqrt`

## **bytes**
Returns the bytes to an human-readable format.

#### Import

```typescript
import { BytesPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 150 | bytes }} <!-- 150 B -->
    {{ 1024 | bytes }} <!-- 1 KB -->
    {{ 1048576 | bytes }} <!-- 1 MB -->
    {{ 1024 | bytes: 0 : 'KB' }} <!-- 1 MB -->
    {{ 1073741824 | bytes }} <!-- 1 GB -->
    {{ 1099511627776 | bytes }} <!-- 1 TB -->
``` 

## **ceil**
Ceils a number with a given precision. Take a look at the official documentation on ceil.

#### Import

```typescript
import { CeilPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 3.4 | ceil }} <!-- 4 -->
    {{ 1.5 | ceil: 1 }} <!-- 1.5 -->
    {{ 1.5444 | ceil: 2 }} <!-- 1.55 -->
``` 

## **floor**
Floor a number with a given precision. Take a look at the official documentation on floor.

#### Import

```typescript
import { FloorPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 3.4 | floor }} <!-- 3 -->
    {{ 1.5 | floor: 1 }} <!-- 1.5 -->
    {{ 1.5444 | floor: 2 }} <!-- 1.54 -->
```

## **round**
Rounds a number with a given precision. Take a look at the official documentation on round.

#### Import

```typescript
import { RoundPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 3.4 | round }} <!-- 3 -->
    {{ 3.5 | round }} <!-- 4 -->
    {{ 1.5 | round: 1 }} <!-- 1.5 -->
    {{ 1.5444 | round: 2 }} <!-- 1.54 -->
    {{ 1.345 | round: 2 }} <!-- 1.35 -->
```

## **degrees**
Converts radians to degrees.

#### Import

```typescript
import { DegreesPipe } from '@naologic/pipes';
```

#### Example

```typescript
    this.value = Math.PI;
    
    {{ value | degrees }} <!-- 180 -->
```

## **radians**
Converts degrees to radians

#### Import

```typescript
import { RadiansPipe } from '@naologic/pipes';
```

#### Example

```typescript
   {{ 180 | radians }} <!-- PI -->
```

## **random**
Returns a random number between a minimum (default: 0) and a maximum (default: 1). The input is ignored. If only one argument is given, it will be the maximum.

#### Import

```typescript
import { RandomPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ {} | random: 0: 1 }} <!-- Random number between 0 and 1 -->
    {{ {} | random: 0: 10 }} <!-- Random number between 0 and 10 -->
    {{ {} | random: 10 }} <!-- Random number between 0 and 10 -->
```

## **sqrt**
Returns the square root of a number.

#### Import

```typescript
import { SqrtPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 81 | sqrt }} <!-- 9 -->
```

## **pow**
Returns the power of a number.

#### Import

```typescript
import { PowPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 2 | pow }} <!-- 4 -->
    {{ 2 | pow: 3 }} <!-- 8 -->
```

# Aggregate
***

* `groupBy`
* `min`
* `max`
* `mean`
* `sum`

## **groupBy**
Returns the groupped data of the given array.

#### Import

```typescript
import { GroupByPipe } from '@naologic/pipes';
```

#### Example

```typescript
    const values = [
        { name: 'a', prop: 'foo' },
        { name: 'b', prop: 'bar' },
        { name: 'c', prop: 'bar' },
        { name: 'd', prop: 'foo' }
    ];
    
    {{ values | groupBy: 'prop' }}
    <!--
    	[
    		{key: foo, value: Array[2]},
    		{key: bar, value: Array[2]}
    	]
    -->
```

## **min**
Returns the minimum of the given array.

#### Import

```typescript
import { MinPipe } from '@naologic/pipes';
```

#### Example

```typescript
   {{ [5, 4, 1, 9] | min }} <!-- 1 -->
```

## **max**
Returns the maximum of the given array.

#### Import

```typescript
import { MaxPipe } from '@naologic/pipes';
```

#### Example

```typescript
   {{ [5, 4, 1, 9] | max }} <!-- 9 -->
```

## **mean**
Returns the mean of the given array.

#### Import

```typescript
import { MeanPipe } from '@naologic/pipes';
```

#### Example

```typescript
   {{ [5, 5, 1, 9] | mean }} <!-- 5 -->
```

## **sum**
Returns the sum of the given array.

#### Import

```typescript
import { SumPipe } from '@naologic/pipes';
```

#### Example

```typescript
   {{ [5, 5, 1, 9] | sum }} <!-- 20 -->
```

# String
***

* `leftpad`
* `rightpad`
* `pad`
* `trim`
* `split`
* `replace`
* `match`
* `test`
* `newlines`
* `capitalize`
* `upperfirst`
* `template`
* `encodeURI`
* `encodeURIComponent`
* `decodeURI`
* `decodeURIComponent`
* `repeat`
* `truncate`
* `slugify`
* `stripTags`
* `latinize`
* `wrap`
* `with`
* `reverseStr`

## **leftpad**
Returns a left-padded string.

#### Import

```typescript
import { LeftPadPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'aaa' | leftpad: 4 }} <!-- ' aaa' -->
    {{ 'aaa' | leftpad: 3 }} <!-- 'aaa' -->
    {{ 'aaa' | leftpad: 5: 'b' }} <!-- 'bbaaa' -->
```


## **rightpad**
Returns a right-padded string.

#### Import

```typescript
import { RightPadPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'aaa' | rightpad: 4 }} <!-- 'aaa ' -->
    {{ 'aaa' | rightpad: 3 }} <!-- 'aaa' -->
    {{ 'aaa' | rightpad: 5: 'b' }} <!-- 'aaabb' -->
```

## **pad**
Returns a padded string. It starts with left and then right.

#### Import

```typescript
import { PadPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'aaa' | pad: 4 }} <!-- ' aaa' -->
    {{ 'aaa' | pad: 5 }} <!-- ' aaa ' -->
    {{ 'aaa' | pad: 5: 'b' }} <!-- 'baaab' -->
```

## **trim**
Trims the string.

#### Import

```typescript
import { TrimPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'aaa' | trim }} <!-- 'aaa' -->
    {{ 'aaa ' | trim }} <!-- 'aaa' -->
    {{ '   aaa       ' | trim }} <!-- 'aaa' -->
```

## **split**
Split a string into an array.

#### Import

```typescript
import { SplitPipe } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'Hello World' | split }} <!-- ['Hello', 'World'] -->
    {{ 'ABABA' | split: 'B' }} <!-- ['A', 'A', 'A'] -->
    {{ 'ABABA' | split: 'B': 2 }} <!-- ['A', 'A'] -->
```

## **replace**
This is the `String#replace()` function, if you want to know more about the arguments, check the official documentation.

#### Import

```typescript
import { ReplacePipe } from '@naologic/pipes';
```

## **match**
This is the `String#match()` function, if you want to know more about the arguments, check the official documentation.

#### Import

```typescript
import { MatchPipe } from '@naologic/pipes';
```

## **test**
This is the `String#test()` function, if you want to know more about the arguments, check the official documentation.

#### Import

```typescript
import { TestPipe } from '@naologic/pipes';
```

## **newlines**
Replaces the `\n`, `\r` and `\r\n` into `<br />`. This function returns HTML so you need to use it
with the [innerHTML] binding.

#### Import

```typescript
import { NewlinesPipe } from '@naologic/pipes';
```
#### Example

```typescript
    this.value = 'Hello, World. \nHow are you ?';
    <span [innerHTML]="value | newlines"></span>

    <!-- Resulting dom
    <span>
        Hello, World. <br /> How are you ?
    </span>
    -->
    
    <!-- Resulting display
    Hello, World.
    How are you ?
    -->
```

## **capitalize**
Capitalize the string. If the argument is true, all the words will be capitalized.

#### Import

```typescript
import { CapitalizePipe } from '@naologic/pipes';
```
#### Example

```typescript
    {{ 'hello world' | capitalize }} <!-- 'Hello world' -->
    {{ 'hello world' | capitalize: true }} <!-- 'Hello World' -->
    {{ 'hELLo wOrld' | capitalize: true }} <!-- 'Hello World' -->
```

## **upperfirst**
Uppercase the first letter.

#### Import

```typescript
import { UpperFirstPipe } from '@naologic/pipes';
```
#### Example

```typescript
    {{ 'hello world' | upperfirst }} <!-- 'Hello world' -->
```

## **template**
Template string.

#### Import

```typescript
import { TemplatePipe } from '@naologic/pipes';
```
#### Example

```typescript
    {{ "Hello $1, it's $2" | template: 'world': 'me' }} <!-- 'Hello world, it's me' -->
```

## **encodeuri**
The encodeURI function.

#### Import

```typescript
import { EncodeURIPipe } from '@naologic/pipes';
```

## **encodeuricomponent**
The encodeURIComponent function.

#### Import

```typescript
import { EncodeURIComponentPipe } from '@naologic/pipes';
```

## **decodeuri**
The decodeURI function.

#### Import

```typescript
import { DecodeURIPipe } from '@naologic/pipes';
```

## **decodeuricomponent**
The decodeURIComponent function.

#### Import

```typescript
import { DecodeURIComponentPipe } from '@naologic/pipes';
```

## **repeat**
Repeats a string.

#### Import

```typescript
import { RepeatPipe } from '@naologic/pipes';
```
#### Example

```typescript
    {{ 'a' | repeat: 2 }} <!-- 'aa' -->
    {{ 'a' | repeat: 2: 'b' }} <!-- 'aba' -->
```

## **truncate**
Truncate a string.
Arguments: (size, suffix, preserve)

#### Import

```typescript
import { TruncatePipe } from '@naologic/pipes';
```
#### Example

```typescript
    {{ 'Hello World' | truncate: 4 }} <!-- 'Hell' -->
    {{ 'Hello World' | truncate: 4: '', true }} <!-- 'Hello' -->
    {{ 'Hello World' | truncate: 4: '...', true }} <!-- 'Hello...' -->
    {{ 'Hello World, how is it going?' | truncate: 14: '...', true }} <!-- 'Hello World, how...' -->
```

## **slugify**
Slugify a string.
Arguments: (string)

#### Import

```typescript
import { SlugifyPipe } from '@naologic/pipes';
```
#### Example

```typescript
    {{ 'The zombie world war began' | slugify }} <!-- 'the-zombie-world-war-began' -->
```

## **striptags**
Strip out html tags from string
Important: this Pipe jobs it's not to replace innerHtml directive, it's only for tiny plain text

#### Import

```typescript
import { StripTagsPipe } from '@naologic/pipes';
```
#### Arguments
* ( string, ends, case-sensitive[optional] )
#### Example

```typescript
    var text = '<p class="paragraph">Lorem Ipsum is simply dummy text of the printing...</p>';
    <p>{{ text | stripTags }}</p>
    <!--result: Lorem Ipsum is simply dummy text of the printing... --> 
```

## **latinize**
Remove accents/diacritics from a string

#### Import

```typescript
import { latinize } from '@naologic/pipes';
```

#### Example

```typescript
    {{ 'Sòme strÏng with Âccénts' | latinize }}
    <!-- result: Some strIng with Accents --> 
```

## **wrap**
Wrap a string with another string

#### Import

```typescript
import { latinize } from '@naologic/pipes';
```
#### Arguments 
* ( string, string, string[optional] )

#### Example

```typescript
    <p>{{ 'foo' | wrap: '/' }}</p> <!--result: /foo/ -->
    <p>{{ 'foo' | wrap: '{{': '}}' }}</p> <!--result: {{foo}} -->
```

## **with**
With pipe check string has start and/or ends

#### Import

```typescript
import { WithPipe } from '@naologic/pipes';
```
#### Arguments 
* ( string, start[optional], ends[optional], case-sensitive[optional] )

#### Example

```typescript
    {{'The Flash Reverse' | with: 'The',null, true}} <!-- result: true -->
    {{'The Flash Reverse' | with: 'The','Reverse',true}} <!-- result: true-->
    {{'The Flash Reverse' | with: 'The','Reverse'}} <!-- result: true-->
    {{'The Flash Reverse' | with: 'the','reverse'}} <!-- result: true-->
    {{'The Flash Reverse' | with: 'the','Reverse',true}} <!-- result: false-->
    {{'The Flash Reverse' | with: 'the','reverse',true}} <!-- result: false-->
    {{'The Flash Reverse' | with: 'Blue','Reverse',true}} <!-- result: false-->
    {{'The Flash Reverse' | with: 'The','Black',true}} <!-- result: false-->
    {{'The Flash Reverse' | with: '','Black',true}} <!-- result: false-->
    {{'The Flash Reverse' | with: '','',true}} <!-- result: 'The Flash Reverse'-->
    {{'The Flash Reverse' | with: null,null,true}} <!-- result: 'The Flash Reverse'-->
    {{'The Flash Reverse' | with: null,null}} <!-- result: 'The Flash Reverse'-->
    {{'The Flash Reverse' | with}} <!-- result: 'The Flash Reverse'-->
```

## **reversestr**
Reverse a string.

#### Import

```typescript
import { ReverseStrPipe } from '@naologic/pipes';
```
#### Arguments 
* ( string, start[optional], ends[optional], case-sensitive[optional] )

#### Example

```typescript
   {{ 'hello world' | reverseStr }} <!-- 'dlrow olleh' -->
```

# String
***

* `keys`
* `toArray`
* `defaults`


## **keys**
Returns the array of keys of the given object or array.

#### Import

```typescript
import { KeysPipe } from '@naologic/pipes';
```
#### Arguments 
* ( string, string, string[optional] )

#### Example

```typescript
    const value = {
        a: 1,
        b: 2,
        c: 3
    };
    {{ value | keys }} <!-- ['a', 'b', 'c'] -->
    {{ [1, 2, 3] | keys }} <!-- ['0', '1', '2'] -->
```


## **toArray**
Transforms an object to an array

#### Import

```typescript
import { ToArrayPipe } from '@naologic/pipes';
```
#### Arguments 
* ( string, string, string[optional] )

#### Example

```typescript
    const value = {
        a: 1,
        b: 2,
        c: 3
    };
    {{ value | toArray }} <!-- [1, 2, 3] -->
```

## **defaults**
Apply defaults value to an object or an object in an array.
When applied to an array, the non object values will be left unchanged. The nulls and undefineds will be changed to the defaults.

#### Import

```typescript
import { DefaultsPipe } from '@naologic/pipes';
```
#### Arguments 
* ( string, string, string[optional] )

#### Example

```typescript
    const d = {
        a: 1,
        b: 2,
        c: 3
    };
    
    const object = {
        a: 2
    }
    
    const array = [
        { a: 2 },
        null,
        { b: 3 },
        undefined
    ];
    {{ object | defaults: d }} <!-- { a: 2, b: 2, c: 3 } -->
    {{ array | defaults: d }} <!-- [{ a: 2, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }, { a: 1, b: 3, c: 3 }, { a: 1, b: 2, c: 3 }]-->
```

## License
[MIT](https://tldrlegal.com/license/mit-license)



_Made with :heart: in San Francisco :us:_
