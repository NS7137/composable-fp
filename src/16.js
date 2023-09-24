// Leapfrogging types with Traversable
const fs = require('fs')
const Task = require('data.task')
const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')

// wrap it in Task
const readFile = futurize(fs.readFile)

// if map we got [Task] but traverse  -> Task([])
const files_ = ['config.json', 'config1.json']
const res_ = files_.map(file => readFile(file, 'utf-8'))

// Traverse expects you to return an applicative functor from this function 
const files = List(['config.json', 'config1.json'])
files.traverse(Task.of, file => readFile(file, 'utf-8'))
  .fork(console.error, console.log)
