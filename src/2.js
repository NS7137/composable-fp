// const Either = Left || Right

const Right = x =>
({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
  x !== null && x !== undefined ? Right(x) : Left(null)

const findColor_ = name =>
  ({ red: '#ff4444', blue: '#3b5998', yellow: '#fff86f' })[name]


const findColor_2 = name => {
  const found = ({ red: '#ff4444', blue: '#3b5998', yellow: '#fff86f' })[name]
  return found ? Right(found) : Left(null)
}

const findColor = name =>
  fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff86f' }[name])


const result_ = Left(2).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x)
const result_1 = findColor_('red').slice(1).toUpperCase()

const result = findColor('green')
  .map(c => c.slice(1))
  .map(c => c.toUpperCase())
  .fold(e => 'no color', x => x)

console.log(result)