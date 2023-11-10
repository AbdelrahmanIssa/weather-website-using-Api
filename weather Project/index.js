// Today's Card Variables

// DOM elements for today's weather card
const today = document.getElementById("today");
const todayDate = document.getElementById("today-date");
const cityLocation = document.getElementById("location");
const todayDegree = document.getElementById("today-degree");
const todayIcon = document.getElementById("today-icon");
const description = document.getElementById("today-description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const compass = document.getElementById("compass");
const searchBar = document.getElementById("search-bar");

// API response and result variables
let apiResponse = '';
let responseResult = '';


// Next Days Variables
// DOM elements for next days' weather
const nextDay = document.getElementsByClassName("nextDay");
const nextDayIcon = document.getElementsByClassName("nextDay-icon");
const maxDegree = document.getElementsByClassName("max-degree");
const minDegree = document.getElementsByClassName("min-degree");
const nextDayDescription = document.getElementsByClassName("nextDay-description");

// Month and Day names
const monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to fetch API response based on the current city
async function getApiResponse(currentCity='Cairo') {
  apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`
  );
  responseResult = await apiResponse.json();
  await displayTodayWeather();
  await displayNextDaysWeather();
};

// Immediately invoked async function to fetch weather data for default city
(async function () {
  await getApiResponse();
})();

// Function to display today's weather information
function displayTodayWeather() {
  const date = new Date();
  today.textContent = dayName[date.getDay()];
  todayDate.textContent = `${date.getDate()} ${monthName[date.getMonth()]}`;
  cityLocation.textContent = responseResult.location.name;
  todayDegree.textContent = responseResult.current.temp_c;
  todayIcon.setAttribute("src", `https:${responseResult.current.condition.icon}`);
  description.textContent = responseResult.current.condition.text;
  humidity.textContent = responseResult.current.humidity;
  wind.textContent = responseResult.current.wind_kph;
  compass.textContent = responseResult.current.wind_dir;
};

// Function to display next days' weather information
function displayNextDaysWeather() {
  let i = 0;
  for (const x of nextDay) {
    x.textContent = dayName[new Date(responseResult.forecast.forecastday[i + 1].date).getDay()];
    nextDayIcon[i].setAttribute("src", `https:${responseResult.forecast.forecastday[i + 1].day.condition.icon}`);
    maxDegree[i].textContent = responseResult.forecast.forecastday[i + 1].day.maxtemp_c;
    minDegree[i].textContent = responseResult.forecast.forecastday[i + 1].day.mintemp_c;
    nextDayDescription[i].textContent = responseResult.forecast.forecastday[i + 1].day.condition.text;
    i++;
  }
};

// another way using for loop but i wanted to try it with for of 
// function displayNextDaysWeather() {
//     for (let i = 0; i < nextDay.length; i++) {
//       nextDay[i].textContent = dayName[new Date(responseResult.forecast.forecastday[i + 1].date).getDay()];
//       nextDayIcon[i].setAttribute("src", `https:${responseResult.forecast.forecastday[i + 1].day.condition.icon}`);
//       maxDegree[i].textContent = responseResult.forecast.forecastday[i + 1].day.maxtemp_c;
//       minDegree[i].textContent = responseResult.forecast.forecastday[i + 1].day.mintemp_c;
//       nextDayDescription[i].textContent = responseResult.forecast.forecastday[i + 1].day.condition.text;
//     }
//   };





// Event listener for search bar input
searchBar.addEventListener("keyup", () => {
  currentCity = searchBar.value;
  getApiResponse(currentCity);
});

