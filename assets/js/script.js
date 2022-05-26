key = '48faf7c466632bcab0303bde';
//And here's an example request: https://v6.exchangerate-api.com/v6/48faf7c466632bcab0303bde/latest/USD
var amountOrigin = document.getElementById('amount-origin').value;
var amountDestination = document.getElementById('amount-destination').textContent;
var currencyOrigin = document.getElementById('currency-origin');
var currencyDestination = document.getElementById('currency-destination');
var convertBtn = document.getElementById('convert-button');
var selectedCurrency = currencyOrigin.options[currencyOrigin.selectedIndex].value;
var selectedDestination = currencyDestination.options[currencyDestination.selectedIndex].value;

function getAPI(){
    var exchangeAPI = 'https://v6.exchangerate-api.com/v6/'+key+'/latest/'+selectedCurrency;
    fetch(exchangeAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(exchData){
            console.log(exchData);
            selectedDestination = window[selectedDestination]
            console.log(exchData.conversion_rates.selectedDestination);
            console.log(selectedDestination);
            // console.log(exchangeRate);
            // console.log(amountOrigin);
            // console.log(amountDestination);
            var exchangeRate = exchData.conversion_rates.selectedDestination;
            amountDestination = amountOrigin*exchangeRate;
        })
}

convertBtn.addEventListener('click', getAPI);

// if (selectedDestination === 'EUR'){
//     exchData.conversion_rates.EUR
// }else if (selectedDestination === 'USD'){
//     exchData.conversion_rates.USD
// }
//created js
//HTML Changes: added id tags, changed option values to match currency codes, and text of countries