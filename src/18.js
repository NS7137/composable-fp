// Principled type conversions with Natural Transformations

const { Either } = require('../types')
const { Right, Left, fromNullable } = Either
const Box = require('../types/box')
const Task = require('data.task')

// F a -> G a
const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

eitherToTask(Right('nightingale'))
  .fork(console.error, console.log)


// Why use Right
// because Left will break the NT laws
const boxToEither = b => b.fold(Right)
// 转成 Left 不会被 map  * 2 操作
const res1 = boxToEither(Box(100)).map(x => x * 2)
const res2 = boxToEither(Box(100).map(x => x * 2))
console.log(res1.toString(), res2.toString());

// Law of natural transformations
// nt(x).map(f) == nt(x.map(f))
// 先转再map 等于 先map再转


// transform a list into either
const first = xs => fromNullable(xs[0])
const res3 = first([1, 2, 3]).map(x => x + 1)
const res4 = first([1, 2, 3].map(x => x + 1))
console.log(res3.toString(), res4.toString());
