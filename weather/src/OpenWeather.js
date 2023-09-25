import Task from 'data.task'
import { compose } from 'ramda'

const makeWeatherUrl = ({ zip, apiKey }) =>
  `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${apiKey}`

const parse = x => x.json()

const fetchIt = url =>
  new Task((rej, res) =>
    fetch(url)
      .then(parse)
      .then(res)
      .catch(rej))


const OpenWeather = {
  fetch: compose(fetchIt, makeWeatherUrl)
}

export { OpenWeather }