//key = '48faf7c466632bcab0303bde';
keyy = '02824edbf5ea8e8e723a61ec';
//And here's an example request: https://v6.exchangerate-api.com/v6/48faf7c466632bcab0303bde/latest/USD

var amountDestination = document.getElementById('amount-destination');
var convertBtn = document.getElementById('convert-button');
var flag = document.getElementById('flag-image');
flag.style.visibility = 'hidden';
var flag2 = document.getElementById('flag-image2');
flag2.style.visibility = 'hidden';

function getAPI(){
    var currencyOrigin = document.getElementById('currency-origin');
    var currencyDestination = document.getElementById('currency-destination');
    var selectedCurrency = currencyOrigin.options[currencyOrigin.selectedIndex].value;
    var selectedDestination = currencyDestination.options[currencyDestination.selectedIndex].value
    var exchangeAPI = 'https://v6.exchangerate-api.com/v6/'+keyy+'/enriched/'+selectedCurrency+'/'+selectedDestination
    
    var exchangeAPI2 = 'https://v6.exchangerate-api.com/v6/'+keyy+'/enriched/'+selectedDestination+'/'+selectedCurrency

    fetch(exchangeAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(exchData){
            console.log(exchData);
            var amountOrigin = document.getElementById('amount-origin').value;
            var exchNum = amountOrigin*exchData.conversion_rate;

            flag.style.visibility = 'visible';
            flag.src = exchData.target_data.flag_url;

            amountDestination.value = exchNum.toFixed(2);
        })
        
        //create flag for origin country
        fetch(exchangeAPI2)
        .then(function(response){
            return response.json();
        })
        .then(function(exchData){
            flag2.style.visibility = 'visible';
            flag2.src = exchData.target_data.flag_url;
            amountDestination.value = exchNum.toFixed(2);
        })
}
convertBtn.addEventListener('click', getAPI);
