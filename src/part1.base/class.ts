/**
 * 类的成员修饰符
 */
abstract class A {
  static a: any;
  public b: any;
  readonly c: any;
  protected d: any;
  private e: any;
  abstract f: any;
}
/**
 * 类的抽象与继承
 */
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
abstract class Animal {
  eat() {
    console.log('eat');
  }
  // 抽象方法只能在抽象类中使用
  abstract sleep(): void; // 必须在派生类中实现
}
const animal = new Animal(); // 错误: 不能创建一个抽象类的实例
class Dog extends Animal {
  // 存在于类本身上面而不是类的实例上
  static food = 'bones';
  // public name = 'dog';
  // 将属性设置为只读的
  readonly legs: number = 4;
  // 声明和赋值合并,在构造函数里使用 修饰符
  constructor(public name: string = 'dog') {
    super(); // 在派生类的构造函数中必须调用 super()
    this.name = name;
    this.pri();
  }
  // 默认为public
  run() {}
  sleep() {
    console.log('Dog sleep');
  }
  // 在它自己或其派生类中仍然可以访问，对比dog和Husky
  protected pro() {}
  // 不能在声明它的类的外部访问
  private pri() {}
}
// 允许创建一个对抽象类型的引用
const dog0: Animal = new Dog('wang');
dog0.run();

const dog = new Dog('wang'); // 允许对一个抽象子类进行实例化和赋值
dog.pri();
dog.pro();
console.log(Dog.food, dog.food);
dog.eat();
dog.run();

/**
 * 多态
 * 由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
 */
class Husky extends Dog {
  eat() {
    this.pro();
    console.log("Husky's food");
  }
}
const husky = new Husky('');
class Teddy extends Dog {
  eat() {
    console.log("Teddy's food");
  }
}
const teddy = new Teddy('');
console.log(husky.eat(), teddy.eat());

/**
 * this类型
 * 这里 this 指的是实例对象
 * 每个方法都返回 this 类型时，我们就可以通过链式调用的形式来使用这些方法
 */
class Counter {
  constructor(public count: number = 0) {}

  add(value: number) {
    this.count += value;
    return this;
  }

  subtract(value: number) {
    this.count -= value;
    return this;
  }
}

let counter = new Counter(10);
console.log(counter.count); // 10
counter.add(2).subtract(3);
console.log(counter.count); // 9

// 你可以继承它，新的类可以直接使用之前的方法
class PowerCounter extends Counter {
  constructor(public count: number) {
    super(count);
  }

  pow(value: number) {
    this.count = this.count ** value;
    return this;
  }
}

let powCounter = new PowerCounter(2);
powCounter.pow(3).add(3).subtract(1);

console.log(powCounter.count); // 10

export {};
