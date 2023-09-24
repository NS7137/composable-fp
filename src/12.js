// Applicative Functors for multiple arguments

const Box = x =>
({
  chain: f => f(x),
  map: f => Box(f(x)),
  fold: f => f(x),
  ap: b2 => b2.map(x), // this x is b1's function
  inspect: () => `Box(${x})`
})
Box.of = x => Box(x)


// 装箱的方法 🤔️应用到 装箱的数据
// 原先做法 只是装箱数据 map应用方法 Box(1).map(f) 只能接受一个参数且 参数在前
// 现在做法 Box(f).ap(Box(2))  参数在后 函数在前 可以preloading
const res_ = Box(x => x + 1).ap(Box(2))  // Box(3)
// 如果装箱的函数是多元函数 且 curried 就可以 连续 ap
const add = x => y => x + y
const res_2 = Box(add)
  .ap(Box(2)) // Box(y => 2 + y)
  .ap(Box(3))


// ==================================================================
// F(x).map(f) == F(f).ap(F(x))
// 定义的时候并不知道是什么Functor所以就用map来实现第一段ap
const liftA2 = (f, fx, fy) => fx.map(f).ap(fy)
const liftA3 = (f, fx, fy, fz) => fx.map(f).ap(fy).ap(fz)
// Box(add).ap(Box(3)).ap(Box(5))
const res = liftA2(add, Box(3), Box(5))

console.log(res.inspect());