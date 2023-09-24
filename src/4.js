const { Map, List } = require('immutable-ext')
// semigroup is a type with a concat method
// semigroup + identity = monoid
// monoid 安全返回值 semigroup 不安全操作 没有empty
// 满足结合律

// always String, close under not change type
const res_ = 'a'.concat('b').concat('c')

// Array
const res_1 = [1, 2].concat([3, 4]).concat([5, 6])

const Sum = x =>
({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
})
Sum.empty = () => Sum(0)

const Product = x =>
({
  x,
  concat: ({ x: y }) => Product(x * y),
  inspect: () => `Product(${x})`
})
Product.empty = () => Product(1)

const All = x =>
({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
})
All.empty = () => All(true)

const Any = x =>
({
  x,
  concat: ({ x: y }) => Any(x || y),
  inspect: () => `Any(${x})`
})
Any.empty = () => Any(false)

// just keep the first one
const First_notSafe = x =>
({
  x,
  concat: _ => First_notSafe(x),
  inspect: () => `First_notSafe(${x})`
})
// First can't define neutral element

const res_2 = Sum(1).concat(Sum(2).concat(Sum(3))).concat(Sum.empty())
const res_3 = Product(1).concat(Product(2).concat(Product(3)))
const res_4 = All(true).concat(All(false).concat(All(true)))
const res_5 = Any(true).concat(Any(false).concat(Any(false)))
const res_6 = First_notSafe('blah').concat(First_notSafe('ice-cream').concat(First_notSafe('meta programming')))

// ====================================================================

const acct1 = { name: 'Nico', isPaid: true, points: 10, friends: ['Franklin'] }
const acct2 = { name: 'Nico', isPaid: false, points: 2, friends: ['Gatsby'] }

const wrapped = acct => {
  const o = { ...acct }
  return { name: First_notSafe(o.name), isPaid: All(o.isPaid), points: Sum(o.points), friends: [...o.friends] }
}

const a = wrapped(acct1)
const b = wrapped(acct2)

const res = Map(a).concat(Map(b))

// console.log(res.toJS());

// ========================================================================

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
  xs.reduce((acc, x) => acc && x, All.empty())

// not safe , can't be [], will boom
const first = xs =>
  xs.reduce((acc, x) => acc)

// =========================================================================

const Right = x =>
({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  concat: o => o.fold(e => Left(e), r => Right(x.concat(r))),
  isLeft: false,
  isRight: true,
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  map: f => Left(x),
  fold: (f, g) => f(x),
  concat: o => Left(x),
  isLeft: true,
  isRight: false,
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
  x !== null && x !== undefined ? Right(x) : Left(null)

const stats = List.of(
  { page: 'Home', views: 40 },
  { page: 'About', views: 10 },
  { page: 'Blog', views: 4 })

stats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum(0))).fold(console.error, console.log)

// First with Either
const First = either =>
({
  fold: f => f(either),
  concat: o => either.isLeft ? o : First(either)
})

First.empty = () => First(Left())

const find = (xs, f) =>
  List(xs)
    .foldMap(x => First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x)

find([3, 4, 5, 6, 7], x => x > 4).fold(console.error, console.log)

// ======================================================================================

