import css from "./style.css"
import search from "./assets/search.svg"

const city = document.getElementById('location-city')
const region = document.getElementById('location-region')
const currentTemp = document.getElementById('current-weather-temp')
const currentCond = document.getElementById('current-weather-condition')
const currentIcon = document.getElementById('current-weather-icon')
const currentHumid = document.getElementById('current-weather-humidity')
const scaleChanger = document.getElementById('scale-changer')
const searchBox = document.getElementById('search-box')
searchBox.addEventListener('keyup', (e) => {
    eventHandler(e)
})
const searchIcon = document.getElementById('search-icon')
searchIcon.src = "search.svg"

let previousCity
let currentCity = "Duluth, MN"
let initialLoad = true
let tempScale = 'f'

scaleChanger.addEventListener('click', () => {
    tempScale = (tempScale === 'f') ? 'c' : 'f'
    getData()
})

function getData() {
    const requestURL = buildRequest()
    const rawWeatherData = fetch(requestURL, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response)
        city.innerText = response.location.name
        region.innerText = response.location.region
        if (tempScale === 'f') {
            currentTemp.innerText = `Temp (F) ${response.current.temp_f}°`
        } else {
            currentTemp.innerText = `Temp (C) ${response.current.temp_c}°`
        }
        currentCond.innerText = response.current.condition.text
        currentIcon.src = response.current.condition.icon
        currentHumid.innerText = `Humidity: ${response.current.humidity} %`
    })
    .catch((err) => {
        console.log(err)
    })
}

function buildRequest() {
    if (initialLoad) {
        previousCity = currentCity
        let apiRequest = `http://api.weatherapi.com/v1/current.json?key=0ecbedf8472340aba18114213232408&q="${currentCity}"&aqi=no`
        initialLoad = false
        return apiRequest
    } else {
        if (searchBox.value) {
            const enteredCity = searchBox.value
            console.log(enteredCity)
            previousCity = currentCity
            currentCity = enteredCity
        }
        let apiRequest = `http://api.weatherapi.com/v1/current.json?key=0ecbedf8472340aba18114213232408&q="${currentCity}"&aqi=no`
        searchBox.value = ""
        return apiRequest
    }

}

function eventHandler(event) {
    if (event.key === "Enter") {
        getData()
    }
}



getData()