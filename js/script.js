var arr = [];
$(".warm").click(function(){
	var swedenWeather = "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3";
	$.getJSON(swedenWeather, function(data){
		$(data.list).each(function(index, element){
			arr.push(element.main.temp);
		}); //End each loop
		Array.min(arr);
		Array.max(arr);
	}); //End getJSON
}); //End click

Array.min = function( array ){
	console.log(Math.min.apply(Math, array))
    return Math.min.apply(Math, array);
};

Array.max = function( array ){
	console.log(Math.max.apply(Math, array))
    return Math.max.apply(Math, array);
};


//Finding highest and lowest degree logic:
//val() higher then all the other val() = highest temperature
//val() lower then all the other val() = lowest temperature

//API KEY : "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=c228f71bf091522167799172d83450d3"
//putting options in URL : "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3"