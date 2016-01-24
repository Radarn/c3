var arr = [];
var map;
var string = "";
$(".warm").click(function(){
	var swedenWeather = "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3";
	$.getJSON(swedenWeather, function(data){
		$(data.list).each(function(index, element){

			//We want the lon and lat, the name and the temp data

			//Pushing all the temperatues into an array

			arr.push(element.main.temp);

		}); //End each loop

		//Checking the lowest and highest temp in the array.

		var lowestTemp = Math.min.apply(Math, arr);
		var highestTemp = Math.max.apply(Math, arr);	

		//Loops through the data.list elements again and check if any of their
		//temperatues matches the lowest/highest temp variables. If so
		//create an object containing the information we need about that element

		var pickFirstCity = 0;
		$(data.list).each(function(index, element){
			if (element.main.temp === highestTemp) {
				//Makes the function pick the first one in the list if there are
				//multiply cities with the same (warmest) degree.
				if (pickFirstCity === 0) {
					var obj = {
						name: element.name,
						lon: element.coord.lon,
						lat: element.coord.lat,
						temp: element.main.temp
					};
					pickFirstCity++;
				};
				$("#map, .back").show();
				return initMap(obj);
			};
		}); // End each loop
	}); //End getJSON
}); //End click

var initMap = function(obj){
	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: obj.lat, lng: obj.lon},
		zoom: 10
	});
	$(".info-text").text("");
	$(".info-text").text("The warmest city in Sweden right now is " + obj.name + " with " + obj.temp + " degrees!");
	$(".cold, .warm").hide();
	$(".back").show();
	$(".back").click(function(){
		$(".cold, .warm").show();
		$("#map, .back").hide();
	});
	
};

Array.min = function(array){
	console.log(Math.min.apply(Math, arr));
	var lowestTemp = Math.min.apply(Math, array);
    return lowestTemp;
};

Array.max = function(array){
	console.log(Math.max.apply(Math, array));
	var highestTemp = Math.max.apply(Math, array);
    return highestTemp;
};


//API KEY : "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=c228f71bf091522167799172d83450d3"
//putting options in URL : "http://api.openweathermap.org/data/2.5/find?lat=62.7&lon=16.2&cnt=20&APPID=c228f71bf091522167799172d83450d3"



