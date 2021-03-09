/**
 * 字面量类型
 */
// 可用于类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
// 也可用于字符串(数字)字面量类型，来约束取值只能是某几个字符串(数字)中的一个
type EventNames = 'click' | 'scroll' | 'mousemove';
type RollDice = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 交叉类型
 * Type1 & Type2
 * 将多个类型合并为一个类型
 */
interface A {
  name: string;
}
interface B {
  age: number;
}

const obj: A & B = {
  name: 'obj',
  age: 18,
};

/**
 * 联合类型
 * Type1 | Type2
 * 只能访问联合类型的所有类型里共有的成员
 */
type AB = A | B;
const ab: AB = { name: 'ab' };
const ab1: AB = { age: 18 };
const ab2: AB = { name: 'ab', age: 18 };

/**
 * 索引类型
 * 通过"索引类型查询"(keyof)和"索引访问"(T[K])操作符
 */
// 索引类型查询操作符: keyof
interface Car {
  manufacturer: string;
  model: string;
  year: number;
}
let taxi: Car = {
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2014,
};
let carProps: keyof Car; // the union of ('manufacturer' | 'model' | 'year')

// 索引访问操作符: T[K]
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}
let name: string = getProperty(taxi, 'manufacturer');
let year: number = getProperty(taxi, 'year');
let unknown = getProperty(taxi, 'unknown');

// 索引签名的参数类型必须为number或string
interface Dictionary<T> {
  [key: string]: T;
}
// 如果索引类型是字符串，keyof 会是 string | number
// 因为在js中可以使用字符串obj['42']或 数字obj[42]索引来访问对象属性
let keys: keyof Dictionary<number>; // string | number
let value: Dictionary<number>['foo']; // number

// 如果索引类型是数字，keyof 会是 number
interface Dictionary1<T> {
  [key: number]: T;
}
let keys1: keyof Dictionary1<number>; // number
let value1: Dictionary1<number>['foo']; // Error, Property 'foo' does not exist on type 'Dictionary1<number>'.
let value2: Dictionary1<number>[42]; // number

/**
 * 映射类型
 * 从旧类型中创建新类型的一种方式
 */

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

// 内部使用了for .. in
// 1 类型变量K，它会依次绑定到每个属性
// 2 字符串字面量联合的Keys，它包含了要迭代的属性名的集合
// 3 属性的结果类型
// 上面映射类型等价于：Flags <=> Flags1
interface Flags1 {
  option1: boolean;
  option2: boolean;
}

// 下面看一下几个简单的更通用的
// ts标准库有更多：
// https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1469
// https://www.typescriptlang.org/docs/handbook/utility-types.html
interface Person {
  name: string;
  age: number;
  gender: 0 | 1;
}
// 每个属性成为 readonly
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };
// 每个属性成为 可选的
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };
// 挑选出某些类型
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
// 以某种格式快速创建一个类型
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
type PersonPickNameAndAge = Pick<Person, 'name' | 'age'>;
type AnyObject = Record<string | number, any>;
// 等价于
type AnyObject1 = {
  [x: string]: any;
  [x: number]: any;
};

/**
 * 条件类型
 * T extends U ? X : Y
 * 若T能够赋值给U，那么类型是X，否则为Y
 */
declare function f<T extends boolean>(x: T): T extends true ? string : number;
// Type is 'string | number
const x = f(Math.random() < 0.5);

// 有条件类型中的类型推断
// infer：引入一个待推断的类型变量
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
type T00 = Foo<{ a: string; b: string }>; // string
type T01 = Foo<{ a: string; b: number }>; // string | number

// 一些内置的有条件类型
// Exclude<T, U> -- 从T中剔除可以赋值给U的类型
type T02 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "b" | "d"
// Extract<T, U> -- 提取T中可以赋值给U的类型
type T03 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "a" | "c"
// NonNullable<T> -- 从T中剔除null和undefined
type T04 = NonNullable<string | number | undefined>; // string | number
// ReturnType<T> -- 获取函数返回值类型
function f1(s: string) {
  return { a: 1, b: s };
}
type T05 = ReturnType<() => string>; // string
// InstanceType<T> -- 获取构造函数类型的实例类型
class C {
  x = 0;
  y = 0;
}
type T06 = InstanceType<typeof C>; // C

export {};
