import apiKey from './apiKey.js'
import { getWeatherItems } from './weather_model.js'

const populateUI = zip =>
  getWeatherItems({ zip, apiKey })
    .map(weathers => ({ name: weathers.city.name, items: weathers.items.map(toLi) }))

const toLi = weather =>
  `<li>${weather.dt} -> ${weather.temp}</li>`

// ==================================================
const app = () => {
  const input = document.getElementById('zip')
  const goButton = document.getElementById('go')
  const city = document.getElementById('city')
  const results = document.getElementById('results')

  goButton.addEventListener('click', () => {
    const zip = input.value.trim()
    populateUI(zip).fork(console.error, html => {
      city.innerHTML = html.name
      results.innerHTML = html.items
    })
  })
}

app()
