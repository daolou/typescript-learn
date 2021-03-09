/**
 * 泛型函数（数组）
 */
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']

/**
 * 泛型接口(类)
 */
type CreateArrayFunc<T> = (length: number, value: T) => Array<T>;

let createArray1: CreateArrayFunc<any>;
createArray1 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

createArray1(3, 'x'); // ['x', 'x', 'x']

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

/**
 * 泛型约束
 */
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    if ({}.hasOwnProperty.call(source, id)) {
      target[id] = (source as T)[id];
    }
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 }); // { a: 1, b: 10, c: 3, d: 20 }
copyFields(x, { b: 10, d: 20, e: 30 });

// T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段

export {};
