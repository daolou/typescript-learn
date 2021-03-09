/**
 * 例子
 */
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
};
// Property 'age' is missing in type '{ name: string; }'.
let tom1: Person = {
  name: 'Tom',
};
// Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
let tom2: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male',
};
// XXX: 赋值的时候，变量的形状必须和接口的形状保持一致

/**
 * 可选属性
 */
interface Person1 {
  name: string;
  age?: number; // 该属性可以不存在
}

let tom3: Person1 = {
  name: 'Tom',
};

/**
 * 任意属性
 */
interface Person2 {
  name: string;
  age?: number;
  [propName: string]: any; // 任意属性取 string 类型的值
}

let tom4: Person2 = {
  name: 'Tom',
  gender: 'male',
};

// XXX: 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Person3 {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom5: Person3 = {
  name: 'Tom',
  age: 25,
  gender: 'male',
};

// XXX: 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
interface Person4 {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom6: Person4 = {
  name: 'Tom',
  age: 25,
  gender: 'male',
};

/**
 * 只读属性
 */
interface Person5 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom7: Person5 = {
  // id: 89757,
  name: 'Tom',
  gender: 'male',
};

tom7.id = 9527;
// Cannot assign to 'id' because it is a constant or a read-only property.

// XXX: 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

/**
 * 可索引类型接口
 */
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];

/**
 * 函数类型接口
 */
interface SearchFunc {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配

/**
 * 混合类型
 * 一个对象可以同时做为函数和对象使用，并带有额外的属性
 */
interface Counter {
  interval: number;
  reset: () => void;
  (start: number): string;
}
function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

/**
 * 类类型接口
 */
interface ClockInterface {
  currentTime: Date;
  setTime: (d: Date) => void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}

/**
 * 接口继承
 */
class Control {
  private state: any;
}
// 接口继承类，继承类的成员但不包括其实现
// 包含了Control的所有成员，包括私有成员state
interface SelectableControl extends Control {
  select: () => void;
}

// 因为state是私有成员，
// 所以只能够是Control的子类们才能实现SelectableControl接口
class Button extends Control implements SelectableControl {
  select() {}
}

class ImageControl implements SelectableControl {
  // Error: Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
  //  Types have separate declarations of a private property 'state'.
  private state: any;
  select() {}
}

export {};
