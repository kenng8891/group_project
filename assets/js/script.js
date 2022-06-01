// key = '48faf7c466632bcab0303bde';
// pullDate = moment().format("YYYY-MM-DD");
// console.log(pullDate)

// var amountDestination = document.getElementById('amount-destination');
// var convertBtn = document.getElementById('convert-button');
// var exchangeUnit = 1
// var counter = 0;
// var dataStorage = [];
// var showStorage = []

// function getAPI(){
//     var currencyOrigin = document.getElementById('currency-origin');
//     var currencyDestination = document.getElementById('currency-destination');
//     var selectedCurrency = currencyOrigin.options[currencyOrigin.selectedIndex].value;
//     var exchangeAPI = 'https://v6.exchangerate-api.com/v6/'+key+'/latest/'+selectedCurrency;

//     // storageData[2] = storageData[1];
//     // storageData[1] = storageData[0];

//     fetch(exchangeAPI)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(exchData){
//             console.log(exchData);
//             var amountOrigin = document.getElementById('amount-origin').value;
//             const exchNum = amountOrigin*exchangeRate;
//             amountDestination.value = exchNum;
//             var goingRate = 1 + " " + selectedCurrency + " equals " + exchangeRate + " " + selectedDestination;
//             document.getElementById("oneToOne").textContent = goingRate;
//             console.log(goingRate);

//             var storageData = {
//                 rate: goingRate,
//                 date: pullDate,
//             };

//             localStorage.setItem("time/rate", JSON.stringify(storageData))
//             localStorage.getItem("time/rate")
//             console.log(storageData);
//             dataStorage[counter] = storageData;
//             counter = counter + 1;
//             dataStorage = dataStorage;
//             console.log(dataStorage);

//         })
// }

// convertBtn.addEventListener('click', getAPI);

keyy = "02824edbf5ea8e8e723a61ec";
//And here's an example request: https://v6.exchangerate-api.com/v6/48faf7c466632bcab0303bde/latest/USD
pullDate = moment().format("YYYY-MM-DD");
var amountDestination = document.getElementById("amount-destination");
var convertBtn = document.getElementById("convert-button");
var flag = document.getElementById("flag-image");
flag.style.visibility = "hidden";
var flag2 = document.getElementById("flag-image2");
flag2.style.visibility = "hidden";
var exchangeUnit = 1;
var counter = 0;
var dataStorage = [];
var showStorage = [];

function getAPI() {
  var currencyOrigin = document.getElementById("currency-origin");
  var currencyDestination = document.getElementById("currency-destination");
  var selectedCurrency =
    currencyOrigin.options[currencyOrigin.selectedIndex].value;
  var selectedDestination =
    currencyDestination.options[currencyDestination.selectedIndex].value;
  var exchangeAPI =
    "https://v6.exchangerate-api.com/v6/" +
    keyy +
    "/enriched/" +
    selectedCurrency +
    "/" +
    selectedDestination;

  var exchangeAPI2 =
    "https://v6.exchangerate-api.com/v6/" +
    keyy +
    "/enriched/" +
    selectedDestination +
    "/" +
    selectedCurrency;

  fetch(exchangeAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (exchData) {
      console.log(exchData);
      var amountOrigin = document.getElementById("amount-origin").value;
      var exchNum = amountOrigin * exchData.conversion_rate;
      var exchangeRate = exchData.conversion_rate;
      flag.style.visibility = "visible";
      flag.src = exchData.target_data.flag_url;

      amountDestination.value = exchNum.toFixed(2);
      var goingRate =
        1 +
        " " +
        selectedCurrency +
        " equals " +
        exchangeRate +
        " " +
        selectedDestination;
      document.getElementById("oneToOne").textContent = goingRate;

      var storageData = {
        rate: goingRate,
        date: pullDate,
          };
    
      localStorage.setItem("time/rate", JSON.stringify(storageData));
      localStorage.getItem("time/rate");
      console.log(storageData);
      dataStorage[counter] = storageData;
      counter = counter + 1;
      dataStorage = dataStorage;
      console.log(dataStorage);

      console.log(goingRate);
      console.log(exchNum)
    })

  //create flag for origin country
  fetch(exchangeAPI2)
    .then(function (response) {
      return response.json();
    })
    .then(function (exchData) {
      flag2.style.visibility = "visible";
      flag2.src = exchData.target_data.flag_url;
      amountDestination.value = exchNum.toFixed(2);
    });

}
convertBtn.addEventListener("click", getAPI);
