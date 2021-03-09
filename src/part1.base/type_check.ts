/**
 * 类型推断
 * 没有明确的指定类型，会依照类型推断的规则自动的推断出一个类型
 */
let luckyNumber = 7; // <=> let luckyNumber: number = 7;
luckyNumber = 'seven'; // 不能将类型“string”分配给类型“number”

// XXX: 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any
let luckyNumber1;
luckyNumber1 = 7;
luckyNumber1 = 'seven';
// 变量后使用 ! 表示类型推断排除null、undefined (未指定strictNullChecks时)
const a: number | undefined | null = undefined;
const b: number = a;
const c: number = a!;

/**
 * 类型断言
 * 可以用来手动指定一个值的类型
 * 语法: "值 as 类型" 或 "<类型>值"(在 tsx 语法中必须使用前者)
 */
interface Cat {
  name: string;
  run: () => void;
}
interface Fish {
  name: string;
  swim: () => void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
// 类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，
// 反而滥用类型断言可能会导致运行时错误:
function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}
const tom: Cat = {
  name: 'Tom',
  run() {
    console.log('run');
  },
};
swim(tom);
// 上面的例子编译时不会报错，但在运行时会报错：
// Uncaught TypeError: animal.swim is not a function`

/**
 * 类型保护
 * 可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值
 */

// 类型判定: parameterName is Type
function isCat(animal: Cat | Fish): animal is Cat {
  return (animal as Cat).run !== undefined;
}
function getPet(): Cat | Fish {
  //
  return {} as Cat;
}
const pet = getPet();
if (isCat(pet)) {
  pet.run();
} else {
  pet.swim();
}

// 使用in操作符
function move(pet: Cat | Fish) {
  if ('swim' in pet) {
    return pet.swim();
  }
  return pet.run();
}

// typeof 类型保护
// typeof v === "typename" 或 typeof v !== "typename"
// "typename"必须是"number"，"string"，"boolean"或"symbol"
// 但是TS并不会阻止你与其它字符串比较，只是不会识别为类型保护
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof 类型保护
interface Padder {
  getPaddingString: () => string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(' ');
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ? new SpaceRepeatingPadder(4) : new StringPadder('  ');
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder.getPaddingString(); // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder.getPaddingString(); // 类型细化为'StringPadder'
}

export {};
