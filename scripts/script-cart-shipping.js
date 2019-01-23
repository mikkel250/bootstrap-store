// need to create a var to hold the element to which we are appending
var cartBody = document.getElementById("cart-body");
var cartFoot = document.getElementById("cart-foot");
var shippingTable = document.getElementById("shipping");

var total = JSON.parse(sessionStorage.getItem("total"));
var shippingTotal = JSON.parse(sessionStorage.getItem("shippingTotal"));
var grandTotal = JSON.parse(sessionStorage.getItem("grandTotal"));

var shippingSameAsBilling = document.getElementById("same-as-shipping");

// Set Shipping region flags
var country = document.getElementById("country").value.toLowerCase();
var region;

function setRegion(country) {
  if (country === "usa" || country === "united states" || country === "united states of america") {
    region = "usa";
  } else if (country === "canada" || country === "mexico") {
    region = "north america";
  } else if (country) {
    region = "international";
  }
}

//var delBtns = document.getElementsByClassName("remove-item");

// Add a new cell to the table - Note: this will need to be modified when it is a quantity

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
      inputElement.defaultValue = "1";

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

function createNewShippingCell(type, secondVal, row) {
  switch (type) {
    case "Title":
      var cell1 = row.insertCell(-1);
      cell1.classList.add("h5");
      cell1.dataset.th = type;
      cell1.textContent = secondVal;
      break;
    case "Shipping": // need to update to toggle button standard/expedited
      
      var cell2 = row.insertCell(-1);
      cell2.classList.add("dropdown");
      let buttonElement = document.createElement("button");
      buttonElement.setAttribute("type", "button");
      //buttonElement.setAttribute("readonly", "true");
      cell1.dataset.toggle = "dropdown";
      //buttonElement.classList.add("form-control", "text-center");
      buttonElement.defaultValue = "Standard";
      break;
    case "Quantity":
      var cell3 = row.insertCell(-1);
      let inputElement = document.createElement("input");
      inputElement.setAttribute("type", "number");
      inputElement.setAttribute("readonly", "true");
      inputElement.classList.add("form-control", "text-center");
      inputElement.defaultValue = "1";

      if (secondVal > 1) {
        inputElement.value = secondVal;
      }
      cell3.appendChild(inputElement);
      break;
    case "Price":
      setRegion(country);
      var cell4 = row.insertCell(-1);
      cell4.dataset.toggle = "dropdown";        
       if (cell2.value === "Standard" && region === "usa") {
          cell2.textContent = "$" + 10;
        } else if ((cell2.value === "Expedited" && region === "usa") || (cell2.value === "Standard" && region === "north america")) {
            cell2.textContent = "$" + 20;
       } else if (cell2.value === "Standard" && region === "international") {
            cell2.textContent = "$" + 30;
       } else if (cell2.value === "Expedited" && region === "north america") {
          cell2.textContent = "$" + 40;
        } else if (cell2.value === "Expedited" && region === "international") {
         cell2.textContent = "$" + 60;
        }
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
    document.getElementById("subtotal").textContent = "$" + total;
  }
}

addGrandTotal() {
  // this isnt really the right way to do this. 
  //Use the vars declared at the top to just add this together and separate functions to calculate and store these vals in session storage.
  let shipping = document.getElementById("shipping");
  let tax = (subt + shipping) * .08;
  let grandt = subt + shipping + tax;
  for (i in shipping)
}


function addItemToShippingTable(obj) {
  let row = cartBody.insertRow(-1);
  createNewCartCell("Title", obj.name, row);
  createNewCartCell("Shipping", obj.shipping, row);
  createNewCartCell("Price", obj.price, row);
  createNewCartCell("Quantity", obj.quantity, row);
  // createNewCartCell("Option", "X", row);
}

function addShippingTotal(shippingTotal) {
  if (total > 0) {
    document.getElementById("shipping-total").textContent = "$" + shippingTotal;
  }
}

function addGrandTotal(grandTotal) {
  if (total > 0) {
    document.getElementById("grandTotal").textContent = "$" + grandTotal;
  }
}

// function for button showing shipping rates
function showShippingRates() {  
  if (country) {    
    setRegion();
    populateShippingTable();
  } else {
    alert("Please fill out the Shipping Address form to calculate shipping rates!");
  }
}
/* Removing for this version
function addListeners() {
  for (i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", removeItem(this));
  }
}
*/
function populateCartTable() {
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
      addItemToCartTable(JSON.parse(sessionStorage.getItem(thisItem)));
    }
  }
}

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

shippingSameAsBilling.addEventListener("change", function() {
  let billingSection = document.getElementById("billing-address-section");
  if (this.checked) {
    billingSection.classList.add("d-none");
  } else {
    billingSection.classList.add("d-block");
  }
});

addLoadEvent(populateCartTable());
addLoadEvent(addSubtotal(total));

/* Using the Event Listener method
// On page load 
function func1() { alert("Hello first function!"); } 
function func2() { alert("Hello second function!"); } 
function func3() { alert("Hello third function!"); } 
if (document.addEventListener) { 
// For all major browsers, except IE 8 and earlier 
window.addEventListener("load", func1); window.addEventListener("load", func2); window.addEventListener("load", func3); 
} else if (document.attachEvent) { 
// For IE 8 and earlier versions 
window.attachEvent("onload", func1); window.attachEvent("onload", func2); window.attachEvent("onload", func3); 
} else { 
// Last resort if all else fails 
window.onload = function() { func1(), func2(), func3() }; }
*/
