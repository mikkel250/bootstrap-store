// ******************************************
// script for individual item pages 

// REFACTORED VERSION OF ORIGINAL SCRIPT TO USE ON THE INDIVIDUAL PAGES, THEN GO BACK AND FIX ON MAIN PAGE.

//Check this out to help with storage: 
// https://vimeo.com/296882879

// an array that can be accessed from multiple functions to hold the name, desc, price of products
var valuesArray = [];
var currentProductName = "";

function getTextFromElement(theNode) {
    for (let i = 0; i < theNode.length; i++) {
        return theNode[i].textContent;
    }
}

// saves current item to session storage
function saveObj(name, valuesArray) {
// Does the object already exist in storage?
    if (sessionStorage.getItem(name)) {
    // If so, pull it out of storage and increment the quantity
        let thisItem = JSON.parse(sessionStorage.getItem(name));
        thisItem.quantity++;
        // then save back to storage
        sessionStorage.setItem(name, JSON.stringify(thisItem));
    } else {
// otherwise, create the object locally and then save it to storage    
    sessionStorage.setItem(name, JSON.stringify(new Item(valuesArray))); // changed to directy create the item and stringify it in one command - and this is actually now working (better)
    }   
}


// adds the price of the item to the running total
function addToTotal(name, theNumber) {
    // pull the current value out of storage
    let currentTotal = JSON.parse(sessionStorage.getItem(name));
    // if there is nothing in storage, set it to zero
    currentTotal = currentTotal ? currentTotal : 0;
   
    // add the current item's price to the total pulled from storage
    let updatedTotal = currentTotal + parseFloat(theNumber);
    
    // save the updated value back to storage
    sessionStorage.setItem(name, JSON.stringify(updatedTotal));
}

//object constructor
function Item(valuesArray) {
    this.name = valuesArray[0];
    this.desc =  valuesArray[1];
    this.price = valuesArray[2];
    this.shipping = valuesArray[3];
    this.quantity = 1;
}

// save the name, price, description to an array which will be used in the object constructor
function createLocalObj(currentNode) {  
    let prodName = currentNode.querySelectorAll(".card-title");
    let prodPrice = currentNode.querySelectorAll(".productPrice");
    let prodDescription = currentNode.querySelectorAll(".productDescription");
   
    name = getTextFromElement(prodName);    
    desc = getTextFromElement(prodDescription);
    price = getTextFromElement(prodPrice);
    
    currentProductName = name;
    valuesArray.push(name, desc, price);
    addShipping(name);
    // debugger shows it working fine up to this point! 
}


function addShipping(name) {
    if (document.getElementById("standard").checked) {
        //add the field to the
        valuesArray.push("standard");
    } else if (document.getElementById("expedited").checked) {
        valuesArray.push("expedited");
    }
}




function addToCart(elem) {
    valuesArray = [];
    
    // go up two levels in the doc
    let upOneLevel = elem.parentElement;
    let upTwoLevels = upOneLevel.parentElement;
    let prodName = upTwoLevels.querySelectorAll(".card-title");
    let name = getTextFromElement(prodName);     

    createLocalObj(upTwoLevels);
    saveObj(name, valuesArray);

    // save the price to separate object to keep track of the total 
    addToTotal("total", price); // PRICE NEEDS TO BE CALLED CORRECTLY HERE

    alert(`${name} added to cart!\nYour subtotal is $${JSON.parse(sessionStorage.getItem("total"))}.\nPlease go to the Cart Page (top right of header) when you are ready to check out.`);
}


// TODO:
/* Note: upTwoLevels is the correct argument to pass in(? maybe? I'm getting undefined when I try to get the text) Everything is a child of that div.card-body 
- Add the appropriate classes to each section of the html so that the getText function will work 
- Add a span to the price to make conversion easier
- Figure out how to deal with the shipping (perhaps another total that's in storage? Or use an attribute of the item itself? e.g. Belle.shipping )


*/

function testAdd(elem) {
    valuesArray = [];
    
    // go up two levels in the doc
    let upOneLevel = elem.parentElement;
    let upTwoLevels = upOneLevel.parentElement;
    let prodName = upTwoLevels.querySelectorAll(".card-title");
    let name = getTextFromElement(prodName); 
    console.log(name); 

    createLocalObj(upTwoLevels);
    saveObj(name, valuesArray);
    
    
}