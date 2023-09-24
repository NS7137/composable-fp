// Unbox types with foldMap
const { List, Map } = require('immutable-ext')
const { Sum } = require('../types/monoid')

const res_ = [Sum(1), Sum(2), Sum(3)]
  .reduce((acc, x) => acc.concat(x), Sum.empty())

// fold remove the type
// Box(3).fold(x => x) // 3
// Right(3).fold(e => e, x => x) // 3

const res_2 = List.of(Sum(1), Sum(2), Sum(3))
  .fold(Sum.empty())  // Sum(6)

const res_3 = List.of(1, 2, 3)
  .map(Sum)
  .fold(Sum.empty())

// with map not be { 'brian': Sum(3), 'sara': Sum(5) } can fold
// just { 'brian': 3, 'sara': 5 } can foldMap or map(Sum).fold(Sum.empty())
// mapping then folding
const res = Map({ 'brian': 3, 'sara': 5 })
  .foldMap(Sum, Sum.empty())  // Sum(8)



console.log(res);