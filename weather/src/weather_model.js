import { OpenWeather } from './OpenWeather.js'

const Weather = (dt, temp) =>
({
  dt,
  temp
})

const toFarenheit = k => (k - 273.15) * 9 / 5 + 32

const toWeather = (dt, temp) =>
  Weather(dt, toFarenheit(temp).toFixed(2))

const prepareItems = w =>
  toWeather(w.dt_txt, w.main.temp)

const getWeatherItems = args =>
  OpenWeather.fetch(args)
    .map(json => ({ city: json.city, items: json.list.map(prepareItems) }))

export { getWeatherItems }
