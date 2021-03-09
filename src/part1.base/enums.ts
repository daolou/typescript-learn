/**
 * 数字枚举
 */
// 不使用初始化，Up的值为0，Down的值为1
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
console.log(Direction['Up'] === 0);
console.log(Direction['Down'] === 1);
console.log(Direction[0] === 'Up');
console.log(Direction[1] === 'Down');

// 手动赋值
// Up初始化为1,Down初始化为3
// 后续自增1(未手动赋值的枚举项会接着上一个枚举项递增，步长为 1)，
// 也就是说 Left=4，Right=5
enum Direction1 {
  Up = 1,
  Down = 3,
  Left,
  Right,
}
console.log(Direction1['Left'] === 4);
console.log(Direction1['Right'] === 5);
console.log(Direction1[4] === 'Left');
console.log(Direction1[5] === 'Right');

// 未手动赋值的枚举项与手动赋值的重复了，不会报错会被覆盖
enum Direction2 {
  Up = 4,
  Down = 3,
  Left,
  Right,
}
console.log(Direction2['Up'] === 4);
console.log(Direction2['Left'] === 4);
console.log(Direction2[4] === 'Up'); // false
console.log(Direction2[4] === 'Left'); // true

/**
 * 字符串枚举
 */
enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
console.log(Direction3.Up === 'UP');

/**
 * 异构枚举
 */
// 可以混合字符串和数字成员，一般不推荐这么做
enum BooleanHeterogeneous {
  No = 0,
  Yes = 'YES',
}

/**
 * 常量成员和计算成员
 */
// 前面的例子都是常量项
// 常量枚举表达式也是常量项
enum FileAccess {
  // 常量成员
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // 计算成员
  G = '123'.length,
}

// 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
enum FileAccess1 {
  // G = '123'.length,
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
}

// 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：

// 1. 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
// 2. 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
// 3. 带括号的常量枚举表达式
// 4. 一元运算符+, -, ~其中之一应用在了常量枚举表达式
// 5. 常量枚举表达式做为二元运算符+, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。

/**
 * const枚举
 */
// 大多数情况下，枚举是十分有效的方案。
// 然而在某些情况下需求很严格。
// 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用const枚举
const enum Directions4 {
  Up,
  Down,
  Left,
  Right,
  // Middle = 'Middle'.length,
}

let directions4 = [Directions4.Up, Directions4.Down, Directions4.Left, Directions4.Right];
// 与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
// 上面的编译结果是：
// var directions4 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

/**
 * 外部枚举
 */
// 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型
// 一般用来描述已经存在的枚举类型
declare enum Directions5 {
  Up,
  Down,
  Left,
  Right,
}

let directions5 = [Directions5.Up, Directions5.Down, Directions5.Left, Directions5.Right];
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除
// 上面的编译结果是：
// var directions5 = [Directions5.Up, Directions5.Down, Directions5.Left, Directions5.Right];

// 外部枚举与声明语句一样，常出现在声明文件中
declare const enum Directions6 {
  Up,
  Down,
  Left,
  Right,
}

let directions6 = [Directions6.Up, Directions6.Down, Directions6.Left, Directions6.Right];
// var directions6 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

export {};
