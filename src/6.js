// Delay Evaluation with LazyBox

// put a function in the box
const LazyBox = g =>
({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g()),
})

const result = LazyBox(() => ' 64 ')
  .map(s => s.trim())
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
// it'll run until call fold
// .fold(c => c.toLowerCase())

console.log(result.fold(x => x));