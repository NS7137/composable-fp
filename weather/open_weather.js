import Task from '../types/task.js'
import { compose } from '../types/fantasy.js'

const makeWeatherUrl = ({ zip, apiKey }) =>
  `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${apiKey}`

const fetchIt = url =>
  new Task((rej, res) =>
    fetch(url)
      .then(x => x.json())
      .then(res)
      .catch(rej)
  )

const OpenWeather = {
  fetch: compose(fetchIt, makeWeatherUrl)
}

export { OpenWeather }