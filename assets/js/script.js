key = '48faf7c466632bcab0303bde';
//And here's an example request: https://v6.exchangerate-api.com/v6/48faf7c466632bcab0303bde/latest/USD

var amountDestination = document.getElementById('amount-destination');
var convertBtn = document.getElementById('convert-button');

function getAPI(){
    var currencyOrigin = document.getElementById('currency-origin');
    var selectedCurrency = currencyOrigin.options[currencyOrigin.selectedIndex].value;
    var exchangeAPI = 'https://v6.exchangerate-api.com/v6/'+key+'/latest/'+selectedCurrency;
    fetch(exchangeAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(exchData){
            console.log(exchData);
            var currencyDestination = document.getElementById('currency-destination');
            var selectedDestination = currencyDestination.options[currencyDestination.selectedIndex].value;
            if (selectedDestination === 'EUR'){
                var exchangeRate = exchData.conversion_rates.EUR
            }else if (selectedDestination === 'USD'){
                var exchangeRate = exchData.conversion_rates.USD
            }else if (selectedDestination === 'CAD'){
                var exchangeRate = exchData.conversion_rates.CAD
            }else if (selectedDestination === 'GBP'){
                var exchangeRate = exchData.conversion_rates.GBP
            }
            var amountOrigin = document.getElementById('amount-origin').value;
            const exchNum = amountOrigin*exchangeRate;
            amountDestination.value = exchNum;
        })
}
convertBtn.addEventListener('click', getAPI);
