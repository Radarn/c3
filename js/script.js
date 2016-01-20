$(".warm").click(function(){
	var swedenWeather = "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3";
	$.getJSON(swedenWeather, function(data){
		console.log(data.message);
	}); //End getJSON
}); //End click


//API KEY : "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=c228f71bf091522167799172d83450d3"
//putting options in URL : "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3"