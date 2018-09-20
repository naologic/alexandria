# @naologic/pipes from :fireworks: [Alexandria Library](https://github.com/naologic/alexandria)

__


## :page_with_curl: Install

```bash
npm install --save @naologic/pipes
```


## Usage

##### In HTML template

```html
{{ collection | orderBy: expression : reverse : caseInsensitive : comparator }}
```

### Arguments

| Param | Type | Default Value | Details |
| --- | --- | --- | --- |
| collection | `array` or `object` |  | The collection or object to sort |
| expression  | `string` or `string array` |  | The key or collection of keys to determinate order |
| reverse *(optional)* | `boolean`| false | Reverse sorting order |
| caseInsensitive *(optional)* | `boolean`| false | Case insensitive compare for sorting |
| comparator *(optional)* | `Function`|  | Custom comparator function to determine order of value pairs. Example: `(a, b) => { return a > b ? 1 : -1; }` [`See how to use comparator`](https://github.com/VadimDez/ngx-order-pipe/issues/39) |

Import `OrderModule` to your module

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent } from './app';
import { NaoPipes } from '@naologic/pipes';

@NgModule({
  imports: [
    BrowserModule, 
    NaoPipes.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

And use pipe in your component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'example',
  template: `
    <ul>
      <li *ngFor="let item of array | orderBy: order">
        {{ item.name }}
      </li>
    </ul> 
  `
})

export class AppComponent {
  array: any[] = [{ name: 'John'} , { name: 'Mary' }, { name: 'Adam' }];
  order: string = 'name';
}
```

### Deep sorting
Use dot separated path for deep properties when passing object.
```html
<div>{{ { prop: { list: [3, 2, 1] } } | orderBy: 'prop.list' | json }}</div>
```
Result:
```html
<div>{ prop: { list: [1, 2, 3] } }</div>
```

### Use OrderByPipe in the component
Import `OrderByPipe` to your component:
```typescript
import { OrderByPipe } from '@naologic/pipes';
```
Add `OrderByPipe` to the constructor of your component and you're ready to use it:

```typescript
constructor(private orderPipe: OrderByPipe) {
  console.log(this.orderPipe.transform(this.array, this.order)); // both this.array and this.order are from above example AppComponent
}
```

### Case insensative / Case sensative
Case insensative flag is the *third* parameter passed to the pipe. Can be `true` to make comparison *case insensative* and `false` to make comparison case sensative.
By default value is set to false.

* Make case insensative order (Third parameter is `true`)
```
<li *ngFor="let item of array | orderBy: order : false : true">
  {{ item.name }}
</li>
```
* Switching third parameter to `false` will do case sensative comparison to order collection:
```
<li *ngFor="let item of array | orderBy: order : false : false">
  {{ item.name }}
</li>
```

## License
[MIT](https://tldrlegal.com/license/mit-license)



_Made with :heart: in San Francisco :us:_
