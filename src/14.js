// List comprehensions with Applicative Functors
const { List } = require('immutable-ext')

/*
// annihilate the need for the ol' nested for loop using Applicatives.

for (x in xs) {
  for (y in ys) {
    for (z in zs) {

    }
  }
}
*/

// loop with all combination
const merch = () => List.of(x => y => z => `${x}-${y}-${z}`)
  .ap(List(['teeshirt', 'sweater']))
  .ap(List(['large', 'medium', 'small']))
  .ap(List(['black', 'white']))

console.log(merch());