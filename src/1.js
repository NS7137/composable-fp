const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const toFloat_1 = regex => str =>
  parseFloat(str.replace(regex, ''))

const toFloat = regex => str =>
  Box(str)
    .map(s => s.replace(regex, ''))
    .map(parseFloat)


const moneyToFloat = toFloat(/\$/g)
const percentToFloat = toFloat(/\%/g)

const applyDiscount_ = (price, discount) => {
  const cost = moneyToFloat(price)
  const savings = percentToFloat(discount) * 0.01
  return cost - cost * savings
}
const applyDiscount = (price, discount) =>
  moneyToFloat(price)
    .fold(cost =>
      percentToFloat(discount)
        .fold(savings =>
          cost - cost * savings * 0.01))



const result = applyDiscount('$5.00', '20%')
console.log(result);