let APIKey = "785495188f0e1c90cfaa9e54882e6e76";
let cityState = "Tucson";
// $("input").val();

let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + cityState + "&appid=" + APIKey;


$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        console.log(queryURL);
        console.log(response);

        $(".citySelected").text(response.name)
        // moment().format('LT');

        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temperature").text("Temperature: " + tempF.toFixed(1) + " ℉");
        $("#humidity").text("Humidity: " + response.main.humidity + " %");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");

        let lat = response.coord.lat
        let lon = response.coord.lon

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey,
            method: "GET"
        })
            .then(function (UVResponse) {
                console.log(UVResponse);
                $("#uvIndex").text("UV Index: " + UVResponse.value)
            })
    })


function getForecast(cityState) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityState + "&appid=" + APIKey,
        method: "GET"
    })
        .then(function (forecastResponse) {
            for (i = 0; i < forecastResponse.list.length; i++) {
                if (forecastResponse.list[i].dt_text.indexOf("15:00:00") !== -1) {
                    let newCard = $("<div>").attr("class", "card text-white bg-primary");
                    $(".forecastEl").append(newCard);

                    let cardHead = $("<div>").attr("class", "card-header").text(moment(forecastResponse.list[i].dt, "X").format("MMM Do"));
                    newCard.append(cardHead);

                    let cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[i].weather[0].icon + "@2x.png");
                    newCard.append(cardImg);

                    let bodyDiv = $("<div>").attr("class", "card-body");
                    newCard.append(bodyDiv);

                    bodyDiv.append($("<p>").attr("class", "card-text").html("Temp: " + forecastResponse.list[i].main.temp + " &#8457;"));
                    bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + forecastResponse.list[i].main.humidity + "%"));
                }
            }
        })
}



