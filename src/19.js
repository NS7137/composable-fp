// Apply Natural Transformations in everyday work
const { List } = require('immutable-ext')
const { fromNullable, Right, Left } = require('../types').Either
const Task = require('data.task')
const Box = require('../types/box')

// chain is not exist in Array
// need to  nt

const res = List(['hello', 'world'])
  .chain(x => x.split(''))

// console.log(res);

const first = xs => fromNullable(xs[0])

const largeNumber = xs => xs.filter(x => x > 100)

const double = x => x * 2

// nt(x).map(f) == nt(x.map(f))
const app_ = xs => first(largeNumber(xs).map(double))
const app = xs => first(largeNumber(xs)).map(double)

// console.log(app([2, 400, 5, 1000]).toString());

//====================================================

const fake = id =>
  ({ id, name: 'user1', best_friend_id: id + 1 })

const Db = ({
  find: id =>
    new Task((rej, res) => res(id > 2 ? Right(fake(id)) : Left('not found')))
})

// to find no.3's best_friend
Db.find(3)  // Task(Right(user))
  .chain(either =>
    either.map(user =>
      Db.find(user.best_friend_id))) //Right(Task(Right(user)))

const eitherToTask = e => e.fold(Task.rejected, Task.of)
// first to do is Either to Task
Db.find(3)  // Task(Right(user))
  .chain(eitherToTask) // Task(user)
  // 就可以直接获取user
  .chain(user =>
    Db.find(user.best_friend_id)) // Task(Right(user))
  .chain(eitherToTask) // Task(user)
  .fork(console.error, console.log)