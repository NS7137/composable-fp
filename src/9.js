const Box = require('../types/box')

// functors with map
// 1st law  preserves function composition  for every functor
// fx.map(f).map(g) == fx.map(x => g(f(x)))
const res1 = Box('squirrels')
  .map(s => s.substring(5))
  .map(s => s.toUpperCase())

const res2 = Box('squirrels')
  .map(s => s.substring(5).toUpperCase())

console.log(res1.inspect(), res2.inspect());

// 2nd law  identity
// fx.map(id) == id(fx)

const id = x => x

const res3 = Box('crayons').map(id)
const res4 = id(Box('crayons'))

console.log(res3.inspect(), res4.inspect());

// ================================================

// lift into pointed functor with of