// need to create a var to hold the element to which we are appending
var cartBody = document.getElementById("cart-body");
var cartFoot = document.getElementById("cart-foot");
var total = JSON.parse(sessionStorage.getItem("total"));
//var delBtns = document.getElementsByClassName("remove-item");

// Add a new cell to the table - Note: this will need to be modified when it is a quantity
// the idea here is to take the values from each k,v pair from session storage and pass it in
function createNewCell(type, secondVal, row) {
  if (type === "Title") {
    var cell1 = row.insertCell(-1);
    cell1.classList.add("h5");
    cell1.dataset.th = type;
    cell1.textContent = secondVal;
  } else if (type === "Price") {
    var cell2 = row.insertCell(-1);
    cell2.dataset.th = type;
    cell2.id = "";
    cell2.textContent = "$" + secondVal;
  } else if (type === "Quantity") {
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
  } else if (type === "Description") {
    var cell4 = row.insertCell(-1);
    cell4.dataset.th = type;
    cell4.textContent = secondVal;

    /* I can't get the remove function working correctly, so I'l leaving this out of this version of the page
 } else if (type == "Option") {
    let lastRow = cartBody.rows[cartBody.rows.length - 1];
    var cell5 = lastRow.insertCell(-1);

    let newBtn = document.createElement("input");
    newBtn.type = "button";
    newBtn.className = ("btn", "remove-item");
    // newBtn.className = ;
    newBtn.style.color = "red";
    newBtn.value = "Remove";
    //newBtn.setAttribute("onClick", removeItem(this));
    cell5.appendChild(newBtn);
    */
  }
}

function addItemToTable(obj) {
  let row = cartBody.insertRow(-1);
  createNewCell("Title", obj.name, row);
  createNewCell("Description", obj.desc, row);
  createNewCell("Price", obj.price, row);
  createNewCell("Quantity", obj.quantity, row);
  // createNewCell("Option", "X", row);
}

function addSubtotal(total) {
  if (total > 0) {
    document.getElementById("subtotal").textContent = "$" + total;
  }
}

/* Removing for this version
function addListeners() {
  for (i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", removeItem(this));
  }
}
*/
function populateTable() {
  for (let i = 0; i < sessionStorage.length; i++) {
    // this gets the key of each local storage item

    let thisItem = window.sessionStorage.key(i);

    if (thisItem != "total" && thisItem.length < 15 && thisItem) {
      // added the length conditional above because the LiveServer was creating a row from a log
      addItemToTable(JSON.parse(sessionStorage.getItem(thisItem)));
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

addLoadEvent(populateTable());
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
