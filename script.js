var latitude = 0;
var longitude = 0;
var API_KEY = "0602afb9d8a68f8a0aec0187f17b75cf";
function geoFindMe() {
  var output = document.getElementById("out");

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
        console.log(results.main.temp);
        console.log(results.name);
        output.innerHTML = '<p>City is ' + results.name + ' <br>Temp is ' + results.main.temp + '&deg;C</p>';
   
      }
    });
}
function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating...</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}