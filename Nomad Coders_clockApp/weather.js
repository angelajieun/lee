const weather = document.querySelector(".js-weather");
const weatherAPI_KEY = "1b119bbeea0460754ee0cfbd1ecdf24a";
const COORDS = 'coords';

function getWeather(lat,lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI_KEY}&units=metric`
  ).then(function(response) { //call back fun
    //console.log(response.json()) // 여기서 보이는 거는 대기 상태라는 뜻
    return response.json()
  }).then(function(json){
    console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}
function saveCoords(coordsObj){
  console.log(JSON.stringify(coordsObj));
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // latitude: latitude,
    // longitude: longitude, //아래와 같이 적을 수 있다.
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError(){
  console.log('error');
}
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadCoords(){
  const loadedcoords = localStorage.getItem(COORDS);
  if (loadedcoords === null){
      askForCoords();
  }else {
    const parseCoords = JSON.parse(loadedcoords);
    getWeather(parseCoords.latitude, parseCoords.longitude)
  }
}

function init(){
  loadCoords();
}

init();