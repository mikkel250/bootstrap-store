
// need to create vars to hold the element to which we are appending
var cartBody = document.getElementById("cart-body");
var cartFoot = document.getElementById("cart-foot");
var total = JSON.parse(sessionStorage.getItem("total"));

// create new row
function createNewTableRow() {
  var cartBody = document.getElementById("cart-body");
  let rowElement = document.createElement("tr");
  cartBody.appendChild(rowElement);
}

// Add a new cell to the table - Note: this will need to be modified when it is a quantity

function createNewCell(type, secondVal) {
  let tdElement = document.createElement("td");
  if (type == "Title") {
    tdElement.classList.add("h5");
    tdElement.dataset.th = type;
    tdElement.textContent = secondVal;
    cartBody.appendChild(tdElement);
  } else if (type == "Price") {
    tdElement.dataset.th = type;
    tdElement.id = "";
    tdElement.textContent = "$" + secondVal;
    cartBody.appendChild(tdElement);
  } else if (type == "Quantity") {
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("readonly", "true");
    inputElement.classList.add("form-control", "text-center");
    inputElement.defaultValue = "1";
    if (secondVal > 1) {
      inputElement.value = secondVal;
    }
    cartBody.appendChild(inputElement);  
  } else {
    tdElement.dataset.th = type;
    tdElement.textContent = secondVal;
    cartBody.appendChild(tdElement);
  }
}

function addItemToTable(obj) {
  createNewTableRow();
  if (obj.name != "total") {
    createNewCell("Title", obj.name);
    createNewCell("Description", obj.desc);
    createNewCell("Price", obj.price);
    createNewCell("Quantity", obj.quantity);
    createNewCell("Option");
  }
}

function addSubtotal(total) {
  if (total > 0) {
    document.getElementById("subtotal").textContent = "$" + total;
  }
}

function removeItem(item) {
  let thisRow = item.rowIndex;
  cartBody.deleteRow(thisRow);
}

function populateTable() {
  for (let i = 0; i < sessionStorage.length; i++) {
    // this gets the key of each local storage item
    let thisItem = window.sessionStorage.key(i); 
    if (thisItem != "total" && thisItem) {
      addItemToTable(JSON.parse(sessionStorage.getItem(thisItem)));
    }
  }
}


// Run the functions when the page is loaded.
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

