// const add = (x, y) => x + y
// const inc = y => add(1, y)
// const res = inc(2)

// Build curried functions
// make preloading
// That's what currying does. You separate each argument returning a new function, and you typically want your data to be the last argument.
const add = x => (y => x + y)

const inc = add(1)  // y => 1 + y

const modulo = dvr => dvd => dvd % dvr

const isOdd = modulo(2)

const filter = pred => xs => xs.filter(pred)

const map = f => xs => xs.map(f)

const getAllOdd = filter(isOdd)


const replace = regex => repl => str => str.replace(regex, repl)

const censor = replace(/[aeiou]/ig)('*')
const censorAll = map(censor)

const res = censorAll(['hello', 'world'])

console.log(res);