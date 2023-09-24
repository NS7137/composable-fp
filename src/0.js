const nextCharForNumberString_1 = str => {
  const trimed = str.trim()
  const number = parseInt(trimed)
  const nextNumber = number + 1
  return String.fromCharCode(nextNumber)
}

const nextCharForNumberString_2 = str =>
  String.fromCharCode(parseInt(str.trim()) + 1)


const nextCharForNumberString_3 = str =>
  [str]
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const nextCharForNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(s => new Number(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())



const result = nextCharForNumberString(' 64 ')
console.log(result);