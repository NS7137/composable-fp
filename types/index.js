const Id = x =>
({
  map: (f) => Id(f(x)),
  chain: (f) => f(x),
  extract: () => x,
  concat: (o) => Id(x.concat(o.extract())),
});

Id.of = (x) => Id(x);

const foldMap = (t, empty, xs) =>
  xs.map(t).reduce((acc, x) => acc.concat(x), empty);

const join = m =>
  m.chain(x => x)

const logIt = x => {
  console.log(x)
  return x
}

const Fn = g =>
({
  map: f =>
    Fn(x => f(g(x))),
  chain: f =>
    Fn(x => f(g(x)).run(x)),
  run: g
})
Fn.ask = Fn(x => x)
Fn.of = x => Fn(() => x)

const FnT = M => {
  const Fn = g =>
  ({
    map: f =>
      Fn(x => g(x).map(f)),
    chain: f =>
      Fn(x => g(x).chain(y => f(y).run(x))),
    run: g
  })
  Fn.ask = Fn(x => M.of(x))
  Fn.of = x => Fn(() => M.of(x))
  Fn.lift = x => Fn(() => x)
  return Fn
}

const Either = (() => {
  const Right = x =>
  ({
    chain: f => f(x),
    ap: other => other.map(x),
    alt: other => Right(x),
    extend: f => f(Right(x)),
    concat: other =>
      other.fold(x => other,
        y => Right(x.concat(y))),
    traverse: (of, f) => f(x).map(Right),
    map: f => Right(f(x)),
    fold: (_, g) => g(x),
    toString: () => `Right(${x})`
  })

  const Left = x =>
  ({
    chain: _ => Left(x),
    ap: _ => Left(x),
    extend: _ => Left(x),
    alt: other => other,
    concat: _ => Left(x),
    traverse: (of, _) => of(Left(x)),
    map: _ => Left(x),
    fold: (f, _) => f(x),
    toString: () => `Left(${x})`
  })

  const of = Right;
  const tryCatch = f => {
    try {
      return Right(f())
    } catch (e) {
      return Left(e)
    }
  }

  const fromNullable = x =>
    x != null ? Right(x) : Left(x)

  return { Right, Left, of, tryCatch, fromNullable }
})()


const EitherT = M => {
  const Right = mx =>
  ({
    extract: () => mx,
    chain: f => Right(mx.chain(x => f(x).extract())),
    map: f => Right(mx.map(f)),
    fold: (_, g) => g(mx)
  })

  const Left = mx =>
  ({
    chain: _ => Left(mx),
    map: _ => Left(mx),
    fold: (h, _) => h(mx)
  })

  const of = x => Right(M.of(x))
  const tryCatch = f => {
    try {
      return Right(M.of(f()))
    } catch (e) {
      return Left(e)
    }
  }

  const lift = Right

  return { of, tryCatch, lift, Right, Left }
}

const Task = fork =>
({
  fork,
  map: f =>
    Task((rej, res) => fork(rej, x => res(f(x)))),
  chain: f =>
    Task((rej, res) => fork(rej, x => f(x).fork(rej, res)))
})
Task.of = x => Task((rej, res) => res(x))
Task.rejected = x => Task((rej, res) => rej(x))

const TaskT = M => {
  const Task = fork =>
  ({
    fork,
    map: f =>
      Task((rej, res) => fork(rej, mx => res(mx.map(f)))),
    chain: f =>
      Task((rej, res) =>
        fork(rej, mx =>
          mx.chain(x => f(x).fork(rej, res))))
  })
  Task.lift = x => Task((rej, res) => res(x))
  Task.of = x => Task((rej, res) => res(M.of(x)))
  Task.rejected = x => Task((rej, res) => rej(x))

  return Task
}

module.exports = { Id, foldMap, join, logIt, Fn, FnT, Either, EitherT, Task, TaskT }