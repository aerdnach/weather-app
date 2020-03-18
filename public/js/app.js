console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationField = document.querySelector('#location')
const forecastField = document.querySelector('#forecast')
const errorField = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    locationField.textContent = ""
    forecastField.textContent = ""
    errorField.textContent = ""

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorField.textContent = data.error
                console.log(data.error)
            } else {
                locationField.textContent = data.location
                forecastField.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})