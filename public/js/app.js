console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationField = document.querySelector('#location')
const forecastField = document.querySelector('#forecast')
const errorField = document.querySelector('#error')
const mapBoxResponseField = document.querySelector('#mapbox-response')
const darkSkyResponseField = document.querySelector('#darksky-response')

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

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
                mapBoxResponseField.textContent = data.mapBoxResponse
                darkSkyResponseField.textContent = data.darkSkyResponse
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})