let APIKey = "785495188f0e1c90cfaa9e54882e6e76";
let cityState = "phoenix";
// $("input").val();

let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + cityState +"&appid=" + APIKey;


$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        console.log(queryURL);
        console.log(response);

        $(".citySelected").text(response.name)
        // (moment().format('LT'));

        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temperature").text("Temperature: " + tempF.toFixed(1) +" ℉");
        $("#humidity").text("Humidity: " + response.main.humidity + " %");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");

        let lat = response.coord.lat
        let lon = response.coord.lon
    
            $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey,
            method: "GET"
        })
            .then(function (response) {    
                console.log(response);
            $("#uvIndex").text("UV Index: " + response.value)
            })
        
    })

    