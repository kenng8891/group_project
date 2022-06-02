keyy = "02824edbf5ea8e8e723a61ec";
//And here's an example request: https://v6.exchangerate-api.com/v6/48faf7c466632bcab0303bde/latest/USD
pullDate = moment().format("YYYY-MM-DD HH:mm");
const amountDestination = document.getElementById("amount-destination");
const convertBtn = document.getElementById("convert-button");
const flag = document.getElementById("flag-image");
flag.style.visibility = "hidden";
const flag2 = document.getElementById("flag-image2");
flag2.style.visibility = "hidden";
const exchangeUnit = 1;
let dataStorage = Array(3).fill(null);
const showStorage = [];



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
      
      
      dataStorage.shift();
      dataStorage.push(storageData)
      for (i = 2; i >= 0; i--) {
        if (dataStorage[i]) {
          localStorage.setItem(`${i}`, `Rate: ${dataStorage[i].rate}, Date: ${dataStorage[i].date}`)
        }
      }
    var pullStorage = []
    for (i = 0; i < 3; i++) {
    pullStorage[i] = localStorage.getItem([i])
      }
      console.log(pullStorage)
    document.getElementById('history').textContent = pullStorage[2]
    document.getElementById('history1').textContent = pullStorage[1]
    document.getElementById('history2').textContent = pullStorage[0]
      
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
