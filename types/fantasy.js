export const compose = (...fns) => v =>
  fns.reduceRight((acc, f) => f(acc), v)

export const pipe = (...fns) => compose(...fns.reverse())

export function curry(fn) {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

export const not =
  (f) =>
    (...args) =>
      !f(...args);

export const binary = (fn) => (arg1, arg2) => fn(arg1, arg2);


export function trampoline(fn) {
  return function trampolined(...args) {
    let result = fn(...args);
    // 将递归变成了循环赋值
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}