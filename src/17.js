// Maintaining structure whilst asyncing
const fs = require('fs')
const Task = require('data.task')
const { List, Map } = require('immutable-ext')

const httpGet = (path, params) => Task.of(`${path}: result`)


// map 得到的结果是 Task在Map里面包裹得到的value
Map({ home: '/', about: '/about-us', blog: '/blog' })
  .map(route => httpGet(route, {}))

// traverse 则返回 Task包裹的Map
Map({ home: '/', about: '/about-us', blog: '/blog' })
  .traverse(Task.of, route => httpGet(route, {}))
  .fork(console.error, console.log)

// 如果Map里面嵌套数组 就只能traverse嵌套 并将数组放入List让其可以traverse操作
const res = Map({ home: ['/', 'home'], about: ['/about-us'], blog: ['/blog'] })
  .traverse(Task.of, routes =>
    List(routes).traverse(Task.of, route => httpGet(route, {})))
  .fork(console.error, console.log)
