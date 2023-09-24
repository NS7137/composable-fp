const { Either } = require('../types')

const liftA2 = (f, fx, fy) => fx.map(f).ap(fy)

// We find a couple of DOM nodes that may or may not exist and run a calculation on the page height using applicatives.
const $ = selector =>
  Either.of({ selector, height: 10 })

const getScreenSize_ = (screen, head, foot) => screen - (head.height + foot.height)

const getScreenSize = screen => head => foot => screen - (head.height + foot.height)


const res_ = $('head').chain(head =>
  $('foot').map(foot =>
    getScreenSize_(800, head, foot))) // Either.of(head => foot => getScreenSize(800, head, foot))

const res_2 = Either.of(getScreenSize(800)).ap($('head')).ap($('foot'))
const res = liftA2(getScreenSize(800), $('head'), $('foot'))

console.log(res.toString());

