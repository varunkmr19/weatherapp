var latitude = 0;
var longitude = 0;
var API_KEY = "0602afb9d8a68f8a0aec0187f17b75cf";
var metric = 0;
var imperial = 0;
function geoFindMe() {
  var output = document.getElementById("out");
  var icon = document.getElementById("icon");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude +"&units=metric"+ "&appid=" + API_KEY,
      dataType: 'jsonp',
      success: function(results) {
      	document.getElementById('btn').style.visibility='hidden';
        output.innerHTML = '<p class = "test">City: ' + results.name + ' <br>Temp: ' + results.main.temp + '&deg;C</p>';
        var code = results.weather[0].id;
        switch(code){
  
        case 500: case 300: case 301: case 302: case 321: //LightRain
          $('#icon').append('<p><img src = "images/light_rain.png"><br>' + results.weather[0].main + '</p>');
           $('body').css('background-image', 'url("images/rain.jpg")');
          break;
          case 501: case 502: case 503: case 504: case 521: //Rain
          $('#icon').append('<p><img src = "images/rain.png"><br>' + results.weather[0].main + '</p>');
           $('body').css('background-image', 'url("images/rain.jpg")');
          break; 
        case 800: //ClearSky
          $('#icon').append('<p><img src = "images/clear_sky.png"><br>' + results.weather[0].main + '</p>');
          break; 
        case 721: case 701: case 711: case 741: // Haze
          $('#icon').append('<p><img src = "images/haze.png"><br>' + results.weather[0].main + '</p>');
          $('body').css('background-image', 'url("images/mist.jpg")');
          break;
          case 600: case 601: case 602: //Snow
          $('#icon').append('<p><img src = "images/snow.png"><br>' + results.weather[0].main + '</p>');
           $('body').css('background-image', 'url("images/snow.jpg")');
          break;
          case 200: case 201: case 202: case 210: case 211: case 212: //Thunderstroms
          $('#icon').append('<p><img src = "images/lighting.png"><br>' + results.weather[0].main + '</p>');
           $('body').css('background-image', 'url("images/thunderstrom.jpg")');
          break;
          case 801: case 802: case 803: case 804:
          $('#icon').append('<p><img src = "images/partly_cloud.png"><br>' + results.weather[0].main + '</p>');
           $('body').css('background-image', 'url("images/cloud.jpg")');
          break;      
        }
      }
    });
}
function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating...</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
