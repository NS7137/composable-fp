//https://api.spotify.com/v1/artists/{id}/related-artists  //artists: []
//https://api.spotify.com/v1/search?q=${query}&type=artist  // artists: {items:[]}

const Task = require('data.task')
const Either = require('data.either')
const { List } = require('immutable-ext')
const { Pair, Sum } = require('../types/monoid')

// ==============================================

// spotify api

const httpGet = url =>
  new Task((rej, res) => {
    fetch(url).then(res).catch(rej)
  })

const getJSON = url =>
  httpGet(url)
    .map(parse)
    .chain(eitherToTask)

const first = xs => Either.fromNullable(xs[0])
const eitherToTask = e => e.fold(Task.rejected, Task.of)

const parse = Either.try(JSON.parse)

const findArtist = name =>
  getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
    .map(result => result.artists.items)
    .map(first)
    .chain(eitherToTask)

const relatedArtists = id =>
  getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`)
    .map(result => result.artists)
    .chain(eitherToTask)

// =============================================

const argv = new Task((rej, res) => res(process.argv))
const names = argv.map(args => args.slice(2))

const Intersection = xs =>
({
  xs,
  concat: ({ xs: ys }) =>
    Intersection(xs.filter(x => ys.some(y => x === y)))
})

const related = name =>
  findArtist(name)
    .map(artist => artist.id)
    .chain(relatedArtists)
    .map(artists => artists.map(artist => artist.name))


const artistsIntersection = rels =>
  rels
    .foldMap(x => Pair(Intersection(x), Sum(x.length)))
    .bimap(x => x.xs, y => y.xs)
    .toList()

// Intersection(rels1).concat(Intersection(rels2)).xs

const main = names =>
  List(names)
    .traverse(Task.of, related)
    .map(artistsIntersection)

// 用List获取多个    
// Task.of(artistsIntersection)
//   .ap(related(name1))
//   .ap(related(name2))

names.chain(main).fork(console.error, console.log)

