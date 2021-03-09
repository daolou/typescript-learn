/** **** 以下均在 strictNullChecks=false noImplicitAny=false 的条件下 ********/

/**
 * 原始类型
 */
let bool = true;
let numb: number | undefined | null = 123;
let str = 'abc';
// str = 123

/**
 * 数组：合并了相同类型的对象
 */
// 使用「类型 + 方括号」来表示数组
let fibonacci1: number[] = [1, 2, 3];
// 使用通用数组类型 Array<elemType> 来表示数组
let fibonacci2: Array<number | string> = [1, 2, 3, '4'];

// 数组的项中不允许出现其他的类型
let fibonacci3: number[] = [1, '1', 2, 3, 5];
// Type 'string' is not assignable to type 'number'.

// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
let fibonacci4: number[] = [1, 1, 2, 3, 5];
fibonacci4.push('8');
// Argument of type '"8"' is not assignable to parameter of type 'number'.

/**
 * 元组：合并了不同类型的对象
 */
// 声明一个元组类型
let x: [string, number];
// 初始化
x = ['hello', 10]; // OK
// 初始化错误
x = [10, 'hello']; // Error
// Type 'number' is not assignable to type 'string'.
// Type 'number' is not assignable to type 'string'.

// 当赋值或访问一个已知索引的元素时，会检测类型
console.log(x[1].substring(1));
// Property 'substring' does not exist on type 'number'.

x[3] = 'world';
// Tuple type '[string, number]' of length '2' has no element at index '3'.

console.log(x[5].toString());
// Object is possibly 'undefined'.
// Tuple type '[string, number]' of length '2' has no element at index '5'.

// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
x.push('!');
x.push(true);
// Argument of type 'true' is not assignable to parameter of type 'string | number'.

/**
 * 函数：
 */
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
};
let myAdd1 = (x: number, y: number): number => x + y;

// 完整写法
let myAdd2: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};

/**
 * 对象：
 */
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;

// 使用object类型，就可以更好的表示像Object.create这样的API
declare function create(o: object | null): void;

create({ prop: 0 });
create(null);
create(undefined); // 取决于是否开启strictNullChecks
create(42);
// Argument of type '42' is not assignable to parameter of type 'object | null'.
create('str');
// Argument of type '"str"' is not assignable to parameter of type 'object | null'.
create(false);
// Argument of type 'false' is not assignable to parameter of type 'object | null'.

/**
 * symbol：
 */
let s1 = Symbol();
let s2 = Symbol();
console.log(s1 === s2); // false

/**
 * undefined, null：
 */
let u: undefined;
let n = null;

// 与 void 的区别是，undefined 和 null 是所有类型的子类型。
// 也就是说 undefined 类型的变量，可以赋值给其他类型的变量(strictNullChecks为false的情况下)
// strictNullChecks为true，只能赋值给any和它们各自的类型（例外：undefined 可以赋值给void）

let num: number; // 不报错

let u1: undefined;
let num1: number = u1; // 这样也不会报错
let num2: void = u1; // 这样也不会报错

/**
 * void：没有任何返回值的函数
 */
function alertName(): void {
  alert('My name is Tom');
}

// 声明一个 void 类型的变量没有什么用，
// 因为你只能将它赋值为 undefined 和 null(strictNullChecks为false的情况下)
let unusable: void;
// OK if `--strictNullChecks` is not given
unusable = null;

/**
 * Unknown：表示编写应用程序时还不知道的变量类型
 */
let notSure: unknown = 4;
notSure = 'maybe a string instead';

// OK, definitely a boolean
notSure = false;

// 如果有 typeof、比较、类型保护等措施，那么其范围缩小到更具体的范围
let maybe: unknown; // 可能是 string, object, boolean, undefined, or other types
const aNumber: number = maybe;
// Type 'unknown' is not assignable to type 'number'.

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
  // Type 'boolean' is not assignable to type 'string'.
}
if (typeof maybe === 'string') {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  const aBoolean: boolean = maybe;
  // Type 'string' is not assignable to type 'boolean'.
}

/**
 * any：允许赋值为任意类型
 */
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

// 与相比unknown，类型变量any允许您访问任意属性，即使不存在也是如此
let looselyTyped: any = 4;
// OK, ifItExists 被认为可能存在
looselyTyped.ifItExists();
// OK, toFixed 被认为可能存在 (但是编译器不会检查是否真的存在)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed();
// Property 'toFixed' does not exist on type 'unknown'.

// noImplicitAny 为 false的情况下，变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型,否则会推断为最后一次赋值的类型
let something; // <=> let something: any;
something = 'seven';
something = 7;

something.setName('Tom');

/**
 * never：永远不存在值的类型，一般用于错误处理函数/高级类型
 */
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed');
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
    // something
  }
}

// 高级类型
type Exclude1<T, U> = T extends U ? never : T;
type T1 = Exclude1<'a' | 'b' | 'c', 'a' | 'd'>; // "b" | "c"

// never类型是任何类型的子类型，也可以赋值给任何类型(strictNullChecks为false的情况下)
let nev1: never;
let num3: number = nev1; // 这样也不会报错
let num4: void = nev1; // 这样也不会报错

export {};
