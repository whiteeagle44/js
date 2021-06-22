let currentDate;
let seconds;
let minutes;
let hours;

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const digitalClock = document.querySelector('#digital-clock');
const currentLocation = document.querySelector('#location');

let secondsDegrees;
let minutesDegrees;
let hoursDegrees;

function updateDate() {
  currentDate = new Date();
  seconds = currentDate.getSeconds();
  minutes = currentDate.getMinutes();
  hours = currentDate.getHours();
}

function setAnalogClock() {
  if(secondsDegrees === undefined && minutesDegrees === undefined && hoursDegrees === undefined ) {
        secondsDegrees = seconds / 60 * 360;
        minutesDegrees = minutes  / 60 * 360;
        hoursDegrees = hours / 12 * 360;
  } else {
        updateDate();
        secondsDegrees = seconds / 60 * 360;
        minutesDegrees = minutes  / 60 * 360;
        hoursDegrees = hours / 12 * 360;
  }
  
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function setDigitalClock() {
  let digitalClockValue = `${hours}:${minutes}:${seconds}`;
  digitalClock.innerHTML = digitalClockValue;
  if(seconds < 10) {
      digitalClockValue = `${hours}:${minutes}:0${seconds}`;
    if(minutes < 10) {
      digitalClockValue = `${hours}:0${minutes}:0${seconds}`;
    }
    if(hours < 10) {
      digitalClockValue = `0${hours}:0${minutes}:${seconds}`;
    }
  }
  if(minutes < 10) {
    digitalClockValue = `${hours}:0${minutes}:${seconds}`;
    if(seconds < 10) {
      digitalClockValue = `${hours}:0${minutes}:0${seconds}`;
    }
    if(hours < 10) {
      digitalClockValue = `0${hours}:0${minutes}:0${seconds}`;
    }
  }
  if(hours < 10) {
    digitalClockValue = `0${hours}:${minutes}:${seconds}`;
    if(seconds < 10) {
      digitalClockValue = `0${hours}:${minutes}:0${seconds}`;
    }
    if(minutes < 10) {
      digitalClockValue = `0${hours}:0${minutes}:0${seconds}`;
    }
  }
  digitalClock.innerHTML = digitalClockValue;
}

setInterval(updateDate, 1000);
setInterval(setAnalogClock, 1000);
setInterval(setDigitalClock, 1000);

function setLocation() {
  $.getJSON("https://json.geoiplookup.io", function(data) {
      //alert("success");
    console.log(data.country_name);
    if(data.country_name == "") {
      currentLocation.innerHTML = `location unknown`;
    } else {
      currentLocation.innerHTML = data.district + ", " + data.country_name ;
    }
  }).fail( function(data, textStatus, error) {
      console.error("getJSON failed, status: " + textStatus + ", error: "+error);
  });
}

setLocation();
