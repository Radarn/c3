var arr = [];
var map;
var coords = {};
window.onload = function(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position);
			coords.lat = position.coords.latitude
			coords.lon = position.coords.longitude
			$(".btn-section").show();
			$("img").hide();
		}); //End anonymous function
	} else {
		alert("Your browser does not support geolocation");
	};
}


$(".warm, .cold").click(function(){
	var id = this.id;
	var lat = coords.lat;
	var lon = coords.lon;
	var coldPhotos = "https://api.flickr.com/services/feeds/photos_public.gne?tags=winterice&format=json&jsoncallback=?"
	var warmPhotos = "https://api.flickr.com/services/feeds/photos_public.gne?tags=tropicalsunset&format=json&jsoncallback=?"
	var weather = "http://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&cnt=50&APPID=c228f71bf091522167799172d83450d3";
	$.getJSON(weather, function(data){
		$(data.list).each(function(index, element){

			//We want the lon and lat, the name and the temp data

			//Pushing all the temperatues into an array

			arr.push(element.main.temp);

		}); //End each loop

		//Getting the highest and lowest temp in the array holding all the temps

		var lowestTemp = Math.min.apply(Math, arr);
		var highestTemp = Math.max.apply(Math, arr);

		//Creating variable to force the program to only choose 1 city even if there
		//are multiply cities that share the highest/coldest degree value at the time

		var pickFirstCity = 0;

		//Adding audio element

		$audio = $("<audio></audio>");
		$("body").append($audio);

		if (id === "warm"){

			//Getting random picture from flickr with tagname tropicalsunset and sets
			//background image property to that image

			$.getJSON(warmPhotos, function(data){
				
				$.each(data.items, function(index, element){
					var $img = $("<img>");
					$img.attr("src", element.media.m);
					$("#imgGallery").append($img);
				}); //End each loop
			}); //End getJSON

			//Setting audio attr and plays it

			$audio.attr("src", "../sounds/warm.mp3");
			$audio.attr("autoplay", "autoplay");

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
							$("#map, .back").show();
							return initMap(obj);
						
					};
				};
			}); //End each loop
		} else if (id === "cold") {

				//Getting random picture from flickr with tagname winterice and sets
				//background image property to that image

				$.getJSON(coldPhotos, function(data){					
					$.each(data.items, function(index, element){
						var $img = $("<img>");
						$img.attr("src", element.media.m);
						$("#imgGallery").append($img);
					}); //End each loop
				}); //End getJSON

					//Setting audio attr and plays it

					$audio.attr("src", "../sounds/cold.mp3");
					$audio.attr("autoplay", "autoplay");
					

				$(data.list).each(function(index, element){
				if (element.main.temp === lowestTemp) {
					//Makes the function pick the first one in the list if there are
					//multiply cities with the same (coldest) degree.
					if (pickFirstCity === 0) {
						var obj = {
							name: element.name,
							lon: element.coord.lon,
							lat: element.coord.lat,
							temp: element.main.temp
						};
						pickFirstCity++;
						$("#map, .back").show();
						return initMap(obj);
					};
				};
			}); //End each loop
		};
	}); //End getJSON
}); //End click

var initMap = function(obj){

	map = new google.maps.Map(document.getElementById("map"), {
		center: {lat: obj.lat, lng: obj.lon},
		zoom: 13
	});

	//Converts Kelvin to Celsius
	var celsius = obj.temp - 273.15;
	celsius = parseFloat(celsius).toFixed(2);

	//Sets the text and hide / shows the different buttons and map
	$(".info-text").text("Right now the warmest spot in your area is " + obj.name + " with " + celsius + "C degrees!");
	$(".btn-section").hide();
	$(".back").show();
	$(".back").click(function(){
		//stops/removes the sound effect
		$audio.remove();
		$(".btn-section").show();
		$("#map, .back").hide();
		$(".info-text").text("");
		$("img").hide();

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



