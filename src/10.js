const Box = require('../types/box')
// Box Either Task List
// F.of, chain(flatMap, bind, >>=)  (Monad interface)


// monad allow us to nest computation
/*
httpGet('user')
  .chain(user =>
    httpGet(`/comments/${user.id}`) // Task(Task([Comment])) map -> chain ->  Task([Comment])
      .chain(comments =>
        updateDOM(user, comments)))  // Task(Task(Task([DOM]))) if didn't call chain
*/


// Box(Box(x)) -> Box(x)
const join = m =>
  m.chain(x => x)
// monad 1st law  三层嵌套
// Box(Box(Box(3))) -> Box(3)
const m = Box(Box(Box(3)))
const res1 = join(m.map(join))
const res2 = join(join(m))
console.log(res1.inspect(), res2.inspect());

// 2nd law  两层嵌套
const n = Box('wonder')
const res3 = join(Box.of(n))
const res4 = join(n.map(Box.of))
console.log(res3.inspect(), res4.inspect());

// map is definable by chain and of
// use chain but of put it back in M
// m.chain(x => M.fo(f(x))) == m.map(x => f(x))