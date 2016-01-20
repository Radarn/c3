$(".warm").click(function(){
	var arr = [];
	var swedenWeather = "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3";
	$.getJSON(swedenWeather, function(data){
		$(data.list).each(function(index, element){
			
			arr.push(element.main.temp);
			/*$(element1.main.temp).each(function(index, element){
				//console.log(element);				
				if (se > this){
					alert("hej");
				} else if (se < this) {
					alert("okay");
				}
			}) // End nested each*/
		}); //End each loop
		console.log(arr);
		console.log(Math.max(parseInt(arr)));
		console.log(Math.min(parseInt(arr)))

	}); //End getJSON
}); //End click

//Finding highest and lowest degree logic:
//val() higher then all the other val() = highest temperature
//val() lower then all the other val() = lowest temperature

//API KEY : "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=c228f71bf091522167799172d83450d3"
//putting options in URL : "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3"