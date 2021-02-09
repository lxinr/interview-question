export default () => {

  // function* generatorFunc1(i) {
  //   yield i + 1;
  //   yield i + 2;
  //   yield i + 3;
  // }

  // function* generatorFunc() {
  //   var count;
  //   count = yield 1;
  //   yield count;
  //   // yield* generatorFunc1(count);
  //   yield count++;
  //   return count
  // }

  // var gen_obj = generatorFunc();
  // console.log(gen_obj.next());// 执行 yield 10，返回 10
  // console.log(gen_obj.next());// 执行 yield 'foo'，返回 'foo'
  // console.log(gen_obj.next(100));// 将 100 赋给上一条 yield 'foo' 的左值，即执行 x=100，返回 100
  // console.log(gen_obj.next());// 执行完毕，value 为 undefined，done 为 true

  function *createIterator() {
    let first = yield 1;
    let second = yield first + 2; // 4 + 2
                                  // first =4 是next(4)将参数赋给上一条的
    yield second + 3;             // 5 + 3
}

let iterator = createIterator();

console.log(iterator.next());    // "{ value: 1, done: false }"
console.log(iterator.next(4));   // "{ value: 6, done: false }"
console.log(iterator.next(5));   // "{ value: 8, done: false }"
console.log(iterator.next());    // "{ value: undefined, done: true }"

function* Van(arr = []) {
  for(const v of arr) {
    yield v
  }
}

const van = Van([3, 5, 8, 10])

console.log(van.next().value) // 3
console.log(van.next().value) // 5
console.log(van.next().value) // 8
console.log(van.next().value) // 10
}