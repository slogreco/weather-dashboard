let APIKey = "785495188f0e1c90cfaa9e54882e6e76";
// let cityState = $("input").val();

let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Phoenix&appid=" + APIKey;


$.ajax({
    url: queryURL,
    method: "GET"
})
