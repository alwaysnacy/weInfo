const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const dateMomentEl = document.getElementById('date-moment');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const forecastMomentEls = document.querySelectorAll('#forecast-moment');


let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';



    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' : minutes) + `<span class="ms-4" id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);



showDate();
function showDate() {
    dateMomentEl.innerHTML = window.moment(dateMomentEl.innerHTML * 1000).format('dddd');
    for (forecastMomentEl of forecastMomentEls) {
        forecastMomentEl.innerHTML = window.moment(forecastMomentEl.innerHTML * 1000).format('ddd');
    }
    sunrise.innerHTML = window.moment(sunriseEl.innerHTML * 1000).format('HH:mm a');
    sunset.innerHTML = window.moment(sunsetEl.innerHTML * 1000).format('HH:mm a');
}