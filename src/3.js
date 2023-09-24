const Right = x =>
({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  map: f => Left(x),
  chain: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
  x !== null && x !== undefined ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const fs = require('fs')

const getPort_ = () => {
  try {
    const str = fs.readFileSync('config.json')
    const config = JSON.parse(str)
    return config.port
  } catch (e) {
    return 3000
  }
}
const getPort_2 = () =>
  tryCatch(() => fs.readFileSync('config.json'))
    .map(c => JSON.parse(c))
    .fold(e => 3000, c => c.port)

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json')) // Right('')
    .chain(c => tryCatch(() => JSON.parse(c)))  // if map will to Right(Right('')) so need chain
    .fold(e => 3000, c => c.port)


const result = getPort()

console.log(result);