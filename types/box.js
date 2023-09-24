const Box = x =>
({
  chain: f => f(x),
  map: f => Box(f(x)),
  fold: f => f(x),
  ap: b2 => b2.map(x),
  inspect: () => `Box(${x})`
})
Box.of = x => Box(x)

module.exports = Box