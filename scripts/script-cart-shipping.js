// need to create a var to hold the element to which we are appending
var cartBody = document.getElementById("cart-body");
var cartFoot = document.getElementById("cart-foot");
var shippingTable = document.getElementById("shipping-body");

var total = JSON.parse(sessionStorage.getItem("total"));
var shippingTotal = document.getElementById("shipping-total");
var grandTotal = document.getElementById("grand-total");
var taxTotal = document.getElementById("tax-total");


var shippingSameAsBilling = document.getElementById("same-as-shipping");
var ccPlaceOrderButton = document.getElementById("cc-place-order");
var bankPlaceOrderButton = document.getElementById("bank-place-order");
var paypalButton = document.getElementById("paypal-button");
var discountButton = document.getElementById("discount-button");

// Set Shipping region flags
var country;
var region;

function setCountry() {
  country = document.getElementById("country").value.toLowerCase();
}

function setRegion(country) {
  if (country === "usa" || country === "united states" || country === "united states of america") {
    region = "usa";
  } else if (country === "canada" || country === "mexico") {
    region = "north america";
  } else if (country) {
    region = "international";
  }
}


// Cart methods

// Add a new cell to the table
function createNewCartCell(type, secondVal, row) {
  switch (type) {
    case "Title":
      var cell1 = row.insertCell(-1);
      cell1.classList.add("h5");
      cell1.dataset.th = type;
      cell1.textContent = secondVal;
      break;
    case "Price":
      var cell2 = row.insertCell(-1);
      cell2.dataset.th = type;
      cell2.id = "";
      cell2.textContent = "$" + secondVal;
      break;
    case "Quantity":
      var cell3 = row.insertCell(-1);
      let inputElement = document.createElement("input");
      inputElement.setAttribute("type", "number");
      inputElement.setAttribute("readonly", "true");
      inputElement.classList.add("form-control", "text-center");
      inputElement.defaultValue = 1;

      if (secondVal > 1) {
        inputElement.value = secondVal;
      }
      cell3.appendChild(inputElement);
      break;
    case "Description":
      var cell4 = row.insertCell(-1);
      cell4.dataset.th = type;
      cell4.textContent = secondVal;
      break;
  }
}



function addItemToCartTable(obj) {
  let row = cartBody.insertRow(-1);
  createNewCartCell("Title", obj.name, row);
  createNewCartCell("Description", obj.desc, row);
  createNewCartCell("Price", obj.price, row);
  createNewCartCell("Quantity", obj.quantity, row);
  // createNewCartCell("Option", "X", row);
}

function addSubtotal(total) {
  if (total > 0) {
    document.getElementById("subtotal").textContent = total;
  }
}

function populateCartTable() {
  for (let i = 0; i < sessionStorage.length; i++) {
    // this gets the key of each local storage item

    let thisItem = window.sessionStorage.key(i);

    if (
      thisItem != "total" &&      
      thisItem.length < 15 &&
      thisItem
    ) {
      // added the length conditional above because the LiveServer was creating a row from a log
      addItemToCartTable(JSON.parse(sessionStorage.getItem(thisItem)));
    }
  }
}


// Shipping Table methods


function updateShipping(shipMethod, region, row) { 
  let priceCell = row.cells[2];
  
  if (shipMethod === "Standard" && region === "usa") {
    priceCell.textContent = "$" + 10;
  } else if ((shipMethod === "Expedited" && region === "usa") || (shipMethod === "Standard" && region === "north america")) {
    priceCell.textContent = "$" + 20;
  } else if (shipMethod === "Standard" && region === "international") {
    priceCell.textContent = "$" + 30;
  } else if (shipMethod === "Expedited" && region === "north america") {
    priceCell.textContent = "$" + 40;
  } else if (shipMethod === "Expedited" && region === "international") {
    priceCell.textContent = "$" + 60;
  }
  getShippingTotals();
}




function createNewShippingCell(type, secondVal, row) {
  switch (type) {
    case "Title":
      var cell1 = row.insertCell(-1);
      cell1.classList.add("h5");
      cell1.dataset.th = type;
      cell1.textContent = secondVal;
      break;

    case "Shipping":
      var cell2 = row.insertCell(-1);
      // add select element
      let selectElement = document.createElement("select");      
      selectElement.classList.add("selectShipping");     
      cell2.appendChild(selectElement);
      // add options to select 
      let option1 = document.createElement("option");
      option1.setAttribute("value", "Standard");
      let txt1 = document.createTextNode("Standard");
      option1.appendChild(txt1);
      selectElement.appendChild(option1);
      let option2 = document.createElement("option");
      option2.setAttribute("value", "Expedited");
      let txt2 = document.createTextNode("Expedited");
      option2.appendChild(txt2);
      // set to expedited if present in session storage      
      if (secondVal == "expedited") {
          option2.setAttribute("selected", true);        
        }
      selectElement.appendChild(option2);
      break;

    case "Price":
      setRegion(country);
      var cell4 = row.insertCell(-1);
      cell4.classList.add("ship-price");
      let shipCell = row.cells[1].childNodes[0];
      let shipMethod = shipCell.options[shipCell.selectedIndex].value;     
      if (shipMethod === "Standard" && region === "usa") { 
        cell4.textContent = "$" + 10;
      } else if ((shipMethod === "Expedited" && region === "usa") || (shipMethod === "Standard" && region === "north america")) {
        cell4.textContent = "$" + 20;
      } else if (shipMethod === "Standard" && region === "international") {
        cell4.textContent = "$" + 30;
      } else if (shipMethod === "Expedited" && region === "north america") {
        cell4.textContent = "$" + 40;
      } else if (shipMethod === "Expedited" && region === "international") {
        cell4.textContent = "$" + 60;
      }
      break;

    case "Quantity":
      var cell3 = row.insertCell(-1);
      let inputElement = document.createElement("input");
      inputElement.setAttribute("type", "number");
      inputElement.setAttribute("readonly", "true");
      inputElement.classList.add("ship-quantity");
      inputElement.classList.add("form-control", "text-center");
      inputElement.defaultValue = 1;
      if (secondVal > 1) {
        inputElement.value = secondVal;
      }
      cell3.appendChild(inputElement);
      break;   
  }

  
}




function addItemToShippingTable(obj) {
  var row = shippingTable.insertRow(-1);
  createNewShippingCell("Title", obj.name, row);
  createNewShippingCell("Shipping", obj.shipping, row);
  createNewShippingCell("Price", obj.price, row);
  createNewShippingCell("Quantity", obj.quantity, row);
  let thisRowShipping = row.getElementsByClassName("selectShipping"); // returns a collection
  
  for (let i = 0; i<thisRowShipping.length; i++) {
    let thisElem = thisRowShipping[i];
    thisElem.addEventListener("change", function (){
      updateShipping(thisElem.value, region, row);
    });
  }
}


// get shipping total
function getShippingTotals() { 
  let prices = document.getElementsByClassName("ship-price");
  let quantities = document.getElementsByClassName("ship-quantity");
  let totalShipPrice = 0;   
  for (let i = 0; i < prices.length; i++) {    
    totalShipPrice += (parseInt(prices[i].textContent.replace(/\D/g, '')) * quantities[i].value);
  }
  shippingTotal.textContent = totalShipPrice;
  taxTotal.textContent = (parseFloat(totalShipPrice) * .08).toFixed(2);
  grandTotal.textContent = (parseFloat(shippingTotal.textContent) + parseFloat(taxTotal.textContent)).toFixed(2);
}



// function for button showing shipping rates
function showShippingRates() {  
  setCountry();  
  if (country) {
    setRegion();
    if (shippingTable.rows.length < 1) {
      populateShippingTable();
    } else {
      alert("Shipping rates already displayed.");
    }    
  } else {
    alert("Please fill out the Shipping Address form to calculate shipping rates!");
  }
 
}


function populateShippingTable() {
  for (let i = 0; i < sessionStorage.length; i++) {
    // this gets the key of each local storage item

    let thisItem = window.sessionStorage.key(i);

    if (
      thisItem != "total" &&
      thisItem != "grandTotal" &&
      thisItem.length < 15 &&
      thisItem
    ) {
      // added the length conditional above because the LiveServer was creating a row from a log
      addItemToShippingTable(JSON.parse(sessionStorage.getItem(thisItem)));
    }
  }
  getShippingTotals();
}


// Payment Methods


function getRandomNumber(min, max) {
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  let randomNum = randomBuffer[0] / (0xffffffff + 1);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNum * (max = min + 1)) + min;
}

function placeOrder() {
  let confirmationMessage = document.getElementById("confirmation-message");
  let emailAddress = document.getElementById("email").value;
  let orderNumber = getRandomNumber(100000000, 999999999);
  
  confirmationMessage.classList.add("alert", "alert-success");
  confirmationMessage.textContent = `Thank you for your order!\n An Email receipt will be sent to ${emailAddress}.\n Your order Number is ${orderNumber}`;

  alert(`Thank you for your order!\n An Email receipt will be sent to ${emailAddress}.\n Your order Number is ${orderNumber}`);
}

//ccPlaceOrderButton.addEventListener("click", function () { placeOrder(); });
bankPlaceOrderButton.addEventListener("click", function() { placeOrder(); });
paypalButton.addEventListener("click", function() { window.open('https://www.paypal.com', '_blank') } );

discountButton.addEventListener("click", function() {alert("Sorry, Invalid discount code!")});

// General Page Methods

// hide billing section
shippingSameAsBilling.addEventListener("change", function() {
  let billingSection = document.getElementById("billing-address-section");
  if (this.checked) {
    billingSection.classList.add("d-none");
  } else {
    billingSection.classList.add("d-block");
  }
});

// run function on page load
function addLoadEvent(func) {
  let oldOnLoad = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldOnLoad) {
        oldOnLoad;
      }
      func();
    };
  }
}


addLoadEvent(populateCartTable());
addLoadEvent(addSubtotal(total));
