const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll("#form select");
const inputField = document.querySelector("#form input");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const msg = document.getElementById("output");
const btn = document.querySelector("form button");




for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      option.selected = "selected";
    }else if (select.name === "to" && currCode === "INR") {
      option.selected = "selected";
    } 
    select.append(option);
    
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}



let updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


const updateExchangeRate = async () => {
  let amount = document.querySelector("#inputAmount input");
  let amtValue = amount.value;  
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromSelect.value.toLowerCase()}.json`;
  const response = await fetch(URL);
  const data = await response.json(); 
  const rate = data[fromSelect.value.toLowerCase()][toSelect.value.toLowerCase()];

  let finalAmount = amtValue * rate;
  msg.innerText = `${amtValue} ${fromSelect.value} = ${finalAmount} ${toSelect.value}`;
  // console.log(finalAmount);
}


btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});


window.addEventListener("load", () => {
  updateExchangeRate();
});


