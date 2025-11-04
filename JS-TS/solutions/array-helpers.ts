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

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  if(!source)  throw new TypeError('filterArray: not implemented');
  const result : T[] = [];
  return result;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  throw new Error('reduceArray: not implemented');
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  throw new Error('partition: not implemented');
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  throw new Error('groupBy: not implemented');
}

export { mapArray}
