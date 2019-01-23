/* 
DOM
https://javascript.info/basic-dom-node-properties

https://www.w3resource.com/javascript-exercises/javascript-dom-exercise-7.php

Notes: 
- Calculate the subtotal by multiplying the price and quantity of each row and display in the td data-th="Subtotal"
- can prob get rid of the section right beloow the tfoot opening tag
<tr class="visible-xs">
                  <td class="text-center"><strong>Total 1.99</strong></td>
                </tr>


-In general, try to clean up the html so it's easy to insert DOM into it

-Also, playing around with the screen size options- the menu button does work, but needs height of black bar at top increased bc it's disappearing
	To do this, edit the following:
	 <button class="navbar-toggler navbar-toggler-right
	 and add bg-inverse to the end

- Add a way to pull the image link text out of the products when added to session storage? This is going to take quite a bit of work to pull off - refactoring most of the code. 
*/

/*
// this is how you would set the data-th attribute 
 tdElement.dataset.th= 'Title';
 // add a class to an element
 cartBody.lastChild.classList.add("h5");
*/

/* turns out this is probably not the right approach

var descElement = document.createElement("td data-th='Description'");
var priceElement = document.createElement("td data-th='Price'");
var quantityElement = document.createElement("td data-th='Quantity'");
var subtotalElement = document.createElement("td data-th='Subtotal'");
let elementsArray = [];
// create an array that can be looped over for each row of the table?
elementsArray.push(rowElement, imgElement, priceElement, quantityElement, subtotalElement);

MATH
Need to add an event listener to the quantity box and update the subtotal.
https://stackoverflow.com/questions/35232127/how-to-sum-a-single-table-column-using-javascript
To sum up the subtotal columns: 


    var cls = document.getElementById("res").getElementsByTagName("td");
    var sum = 0;
    for (var i = 0; i < cls.length; i++){
        if(cls[i].className == "countable"){
            sum += isNaN(cls[i].innerHTML) ? 0 : parseInt(cls[i].innerHTML);
        }
    }

STORAGE
https://www.smashingmagazine.com/2010/10/local-storage-and-how-to-use-it/
https://www.smashingmagazine.com/2014/02/create-client-side-shopping-cart/
*/

// need to create a var to hold the element to which we are appending
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
// the idea here is to take the values from each k,v pair from session storage and pass it in
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
    /* } else if (type == "Option") {
    let removeElement = document.createElement("button");
    removeElement.dataset.th = type;
    //removeElement.setAttribute("type", "button");
    removeElement.setAttribute("onClick", removeItem(this));
    removeElement.classList.add("fa");
    removeElement.classList.add("fa-close"); 
    removeElement.style.color = "red";
    cartBody.appendChild(removeElement); */
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

    let thisItem = window.sessionStorage.key(i); // THIS IS RETURNING JUST A STRING (even when I parse it!!)..I NEED THE WHOLE OBJECT
    // THE PROBLEM HERE IS THAT THE ADD TO CART FUNCTION ON THE HOME PAGE IS NOT WORKING CORRECTLY...
    // Need to use the individual page as a model, since that one is working correctly

    // var KeyName = window.localStorage.key(index);
    // the sessionStorage.key is returning the name of the object in the debugger. Not working as expected

    //debugger;
    // the loop was trying to add the total into the
    if (thisItem != "total" && thisItem) {
      addItemToTable(JSON.parse(sessionStorage.getItem(thisItem)));
    }
  }
}

/*
Loop through session storage
https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance


// https://www.reddit.com/r/javascript/comments/3y97w8/looping_through_localstorage/
Another from same pg:
// Retrieve the string and turn it back into an object by using JSON.parse
var savedFruits = JSON.parse(localStorage.getItem('fruits'));

// Loop through the object and print the count for each fruit
for (var key in savedFruits) {
  alert('Fruit: ' + key + '\nCount: ' + savedFruits[key]);
}


*/

// Run the functions when the page is loaded. From:
// https://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm
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
