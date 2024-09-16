//API Key :ede20709b4124a11b49225153242506 

var searchInput = document.querySelector('.searchInput')
var searchButton = document.querySelector('.searchButton')
var degree = document.querySelector('.num')
var locationCity = document.querySelector('.location')
var wind = document.querySelector('.wind')
var isDay = document.querySelector('.forecast-icon img')
var conditionOfWeather = document.querySelector('.condition')
var dayToday = document.querySelector('.day')
var dateToday = document.querySelector('.date')

var nextDay = document.querySelector('.nextDay')
var maxTemp = document.querySelector('.maxTemp')
var minTemp = document.querySelector('.minTemp')
var nextDayIcon = document.querySelector('.nextDayIcon img')
var nextDayCondition = document.querySelector('.nextDayCondition')

var thirdDay = document.querySelector('.thirdDay')
var maxTempThird = document.querySelector('.maxTempThird')
var minTempThird = document.querySelector('.minTempThird')
var thirdDayIcon = document.querySelector('.thirdDayIcon img')
var thirdDayCondition = document.querySelector('.thirdDayCondition')
var City = []
async function getWeather (city ){
    var res = await fetch(`http://api.weatherapi.com/v1/current.json?key=ede20709b4124a11b49225153242506&q=${city}`);
    var data = await res.json();
    console.log(data);
    City = data.current
    console.log(City.temp_c);
    console.log(City.wind_kph);
   
    degree.innerHTML = City.temp_c + '°C';
    locationCity.innerHTML =  data.location.name;
    wind.innerHTML = City.wind_kph + 'Km/h';

  if(City.condition.icon.includes('day')){
    var src = 'https:' + City.condition.icon
    isDay.setAttribute('src',`${src}`)

    }else{
        var src = 'https:' + City.condition.icon
        isDay.setAttribute('src',`${src}`)
        }

    conditionOfWeather.innerHTML = City.condition.text
    var dateModified = City.last_updated
    var datecity = new Date(dateModified)
    var day = datecity.toDateString()
    console.log(day);
    dayToday.innerHTML = day.slice(0,4)
    dateToday.innerHTML = day.slice(4,)
    

    
}



async function forecastNextDay (city){
    var res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ede20709b4124a11b49225153242506&q=${city}&days=3`)
    var data = await res.json();
    console.log(data);
    var forecastMaxTemp = data.forecast.forecastday[1].day.maxtemp_c
    var forecastMinTemp = data.forecast.forecastday[1].day.mintemp_c
    maxTemp.innerHTML = forecastMaxTemp + '°C'
    minTemp.innerHTML = forecastMinTemp + '°C'
    var dateModified = data.forecast.forecastday[1].date
    var datecity = new Date(dateModified)
    var day = datecity.toDateString()
    nextDay.innerHTML = day.slice(0,4)

    if(data.forecast.forecastday[1].day.condition.icon.includes('day')){
        var src = 'https:' + data.forecast.forecastday[1].day.condition.icon
        nextDayIcon.setAttribute('src' , `${src}`)

    }else{
        var src = 'https:' + data.forecast.forecastday[1].day.condition.icon
        nextDayIcon.setAttribute('src' , `${src}`)

    }
    nextDayCondition.innerHTML = data.forecast.forecastday[1].day.condition.text
}

async function forecastThirdDay (city){
    var res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ede20709b4124a11b49225153242506&q=${city}&days=3`)
    var data = await res.json();
    console.log(data);
    var forecastMaxTemp = data.forecast.forecastday[2].day.maxtemp_c
    var forecastMinTemp = data.forecast.forecastday[2].day.mintemp_c
    maxTempThird.innerHTML = forecastMaxTemp + '°C'
    minTempThird.innerHTML = forecastMinTemp + '°C'
    var dateModified = data.forecast.forecastday[2].date
    var datecity = new Date(dateModified)
    var day = datecity.toDateString()
    thirdDay.innerHTML = day.slice(0,4)

    if(data.forecast.forecastday[2].day.condition.icon.includes('day')){
        var src = 'https:' + data.forecast.forecastday[1].day.condition.icon
        thirdDayIcon.setAttribute('src' , `${src}`)

    }else{
        var src = 'https:' + data.forecast.forecastday[2].day.condition.icon
        thirdDayIcon.setAttribute('src' , `${src}`)

    }
    thirdDayCondition.innerHTML = data.forecast.forecastday[2].day.condition.text
}
// async function startUp (){
    
//     getWeather("cairo")
//     forecastNextDay("cairo")
//     forecastThirdDay("cairo")
// }
// startUp()

searchButton.addEventListener("click", function(){
    var location = searchInput.value
    getWeather(location)
    forecastNextDay(location)
    forecastThirdDay(location)

})