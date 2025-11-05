/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  
  if(!source) throw new TypeError('mapArray: not implemented');
  const result : R[] = [];
 source.forEach((item, idx) => {
    result.push(mapper(item, idx));
  });
  return result;
}

function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  if(!source)  throw new TypeError('filterArray: not implemented');
  const result : T[] = [];
  source.forEach((item, idx) => {
    if(predicate(item, idx)) {
      result.push(item);
    }
  });
  return result;
}

function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  if(!source) throw new TypeError('reduceArray: not implemented');
  let result : R = initial;
  source.forEach((item, idx) => {
    result = reducer(result, item, idx);
  });
  return result;
}

function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if(!source) throw new TypeError('partition: not implemented');
  const truly : T[] = [];
  const falsy : T[] = [];
  /// we don't need index here
  for(const item of source) {
    predicate(item) ? truly.push(item) : falsy.push(item);
  }
  return [truly, falsy];
}

function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
 if(!source) throw new TypeError('groupBy: not implemented');
  const result : Record<K, T[]> = {} as Record<K, T[]>;
  for(const item of source) {
    const key = keySelector(item);
    if(!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

export { mapArray, filterArray, reduceArray, partition, groupBy }
