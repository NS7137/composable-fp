// Isomorphisms and round trip data transformations

// An isomorphism is a pair of functions, to and from, where if I call two on x followed by a from, I should just get back my original x. It means I can convert and convert back to get my original x. We can do the same thing with the y here. We can go from and to to get back our y.

const { List, Map } = require('immutable-ext')
const { fromNullable, Right, Left } = require('../types').Either
const Task = require('data.task')
const Box = require('../types/box')

// to from
// from(to(x)) == x
// to(from(y)) == y

// ===============================================

// String ~ [Char]

const Iso = (to, from) =>
({
  to,
  from
})

const chars = Iso(s => s.split(''), c => c.join(''))

const truncate = str =>
  chars.from(chars.to(str).slice(0, 3)).concat('...')

const res_ = chars.from(chars.to('hello world'))
const res_1 = truncate('hello world')


// ===============================================

// Either null or a ~ [a] 
const singleton = Iso(e => e.fold(() => [], x => [x]), ([x]) => x ? Right(x) : Left())

const filterEither = (e, pred) => singleton.from(singleton.to(e).filter(pred))

const res = filterEither(Right('hello'), x => x.match(/h/ig)).map(x => x.toUpperCase())
console.log(res.toString());