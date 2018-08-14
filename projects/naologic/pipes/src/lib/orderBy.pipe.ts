import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  /**
   * Check if a value is a string
   *
   */
  static isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  /**
   * Sorts values ignoring the case
   */
  static caseInsensitiveSort(a: any, b: any) {
    if (OrderByPipe.isString(a) && OrderByPipe.isString(b)) {
      return a.localeCompare(b);
    }
    return OrderByPipe.defaultCompare(a, b);
  }

  /**
   * Default compare method
   */
  static defaultCompare(a: any, b: any) {
    if (a === b) {
      return 0;
    }
    if (a == null) {
      return 1;
    }
    if (b == null) {
      return -1;
    }
    return a > b ? 1 : -1;
  }

  /**
   * Parse expression, split into items
   */
  static parseExpression(expression: string): string[] {
    expression = expression.replace(/\[(\w+)\]/g, '.$1');
    expression = expression.replace(/^\./, '');
    return expression.split('.');
  }

  /**
   * Get value by expression
   */
  static getValue(object: any, expression: string[]) {
    for (let i = 0, n = expression.length; i < n; ++i) {
      const k = expression[i];
      if (!(k in object)) {
        return;
      }
      object = object[k];
    }

    return object;
  }

  /**
   * Set value by expression
   */
  static setValue(object: any, value: any, expression: string[]) {
    let i;
    for (i = 0; i < expression.length - 1; i++) {
      object = object[expression[i]];
    }

    object[expression[i]] = value;
  }

  transform(value: any | any[], expression?: any, reverse?: boolean, isCaseInsensitive: boolean = false, comparator?: Function): any {
    if (!value) {
      return value;
    }

    if (Array.isArray(expression)) {
      return this.multiExpressionTransform(value, expression, reverse, isCaseInsensitive, comparator);
    }

    if (Array.isArray(value)) {
      return this.sortArray(value.slice(), expression, reverse, isCaseInsensitive, comparator);
    }

    if (typeof value === 'object') {
      return this.transformObject(Object.assign({}, value), expression, reverse, isCaseInsensitive, comparator);
    }

    return value;
  }

  /**
   * Sort array
   */
  private sortArray(value: any[], expression?: any, reverse?: boolean, isCaseInsensitive?: boolean, comparator?: Function): any[] {
    const isDeepLink = expression && expression.indexOf('.') !== -1;

    if (isDeepLink) {
      expression = OrderByPipe.parseExpression(expression);
    }

    let compareFn: Function;

    if (comparator && typeof comparator === 'function') {
      compareFn = comparator;
    } else {
      compareFn = isCaseInsensitive ? OrderByPipe.caseInsensitiveSort : OrderByPipe.defaultCompare;
    }

    const array: any[] = value.sort((a: any, b: any): number => {
      if (!expression) {
        return compareFn(a, b);
      }

      if (!isDeepLink) {
        if (a && b) {
          return compareFn(a[expression], b[expression]);
        }
        return compareFn(a, b);
      }

      return compareFn(OrderByPipe.getValue(a, expression), OrderByPipe.getValue(b, expression));
    });

    if (reverse) {
      return array.reverse();
    }

    return array;
  }

  /**
   * Transform Object
   */
  private transformObject(value: any | any[], expression?: any, reverse?: boolean, isCaseInsensitive?: boolean, comparator?: Function): any {
    const parsedExpression = OrderByPipe.parseExpression(expression);
    let lastPredicate = parsedExpression.pop();
    let oldValue = OrderByPipe.getValue(value, parsedExpression);

    if (!Array.isArray(oldValue)) {
      parsedExpression.push(lastPredicate);
      lastPredicate = null;
      oldValue = OrderByPipe.getValue(value, parsedExpression);
    }

    if (!oldValue) {
      return value;
    }

    OrderByPipe.setValue(value, this.transform(oldValue, lastPredicate, reverse, isCaseInsensitive), parsedExpression);
    return value;
  }

  /**
   * Apply multiple expressions
   */
  private multiExpressionTransform(value: any, expressions: any[], reverse: boolean, isCaseInsensitive: boolean = false, comparator?: Function): any {
    return expressions.reverse().reduce((result: any, expression: any) => {
      return this.transform(result, expression, reverse, isCaseInsensitive, comparator);
    }, value);
  }
}
