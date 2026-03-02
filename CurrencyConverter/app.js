
const dropDowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// const apiKey = "8b2732f9279c1632371cb646";
// const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;

for(let country in countryName){
    console.log(countryName[country]);
}

for(let select of dropDowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        // let country = countryName[currCode];
        newOption.innerText = countryName[currCode];
        newOption.value = currCode;
        if(select.name === "currencyFrom" && currCode === "INR"){
            newOption.selected = "selected";
        }else if(select.name === "currencyTo" && currCode === "NPR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

     select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amt.value = 1;
    }
    console.log(amtVal);

    let fromCurrency = fromCurr.value;
    let toCurrency = toCurr.value;

    if (!fromCurrency || !toCurrency) {
        alert("Please select both currencies");
        return;
    }

    const BASE_URL = `https://open.er-api.com/v6/latest/${fromCurrency}`;

    console.log("Fetching:", BASE_URL);
    console.log(fromCurrency);

    let response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Invalid currency or network error");
    }

    let data = await response.json();
    let rate = data.rates[toCurrency];
    
    let finalamt = rate * amtVal;
    console.log(`${amtVal} ${fromCurrency} = ${rate} ${toCurrency}`);

    msg.innerText = `${amtVal} ${fromCurrency} = ${finalamt} ${toCurrency}`;

});



const exchange = document.querySelector("#exchange");

const exchangeCurrency = (fromCurrency,toCurrency) => {

    let selectFrom = document.getElementById("selectFrom");
    let selectTo = document.getElementById("selectTo");

    // console.log(selectFrom.value);
    // console.log(selectTo.value);
    let temp = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = temp;
    // console.log(selectFrom.value);
    // console.log(selectTo.value);

    updateFlag(selectFrom);
    updateFlag(selectTo);

    btn.click();
}

exchange.addEventListener("click", exchangeCurrency);




