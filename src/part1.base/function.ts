/**
 * 可选参数
 * 可选参数必须接在必需参数后面
 * 也就是说可选参数后面不允许再出现必需参数了
 */
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

/**
 * 参数默认值
 */
function buildName1(firstName: string, lastName = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat1 = buildName1('Tom', 'Cat');
let tom1 = buildName1('Tom');

/**
 * 剩余参数
 */
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);

/**
 * 重载
 * 允许一个函数接受不同数量或类型的参数时，作出不同的处理
 */
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    const sign: boolean = x < 0;
    let [x1, y1] = [0, 0];
    if (sign) {
      x1 = -x;
    }
    while (x1 > 9) {
      y1 = y1 * 10 + (x1 % 10) * 10;
      x1 = ~~(x1 / 10);
    }
    y1 += x1;
    return sign ? -y1 : y1;
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  } else {
    throw new Error('Invalid');
  }
}

reverse(123);
reverse('123');

// 前几次都是函数定义，最后一次是函数实现
// 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面

export {};
