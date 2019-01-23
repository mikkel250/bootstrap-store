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

/* Redundant, can likely be removed
function getTextFromGallery(elem, textClass) {
	let upOneLevel = elem.parentElement;
	let upTwoLevels = upOneLevel.parentElement;
	let thisElem = upTwoLevels.querySelectorAll("textClass");
	getTextFromElement(thisElem);
}
*/


function createLocalObj(currentNode) {  
    let prodName = currentNode.querySelectorAll(".productName");
    let prodPrice = currentNode.querySelectorAll(".productPrice");
    let prodDescription = currentNode.querySelectorAll(".productDescription");
   
    name = getTextFromElement(prodName);    
    desc = getTextFromElement(prodDescription);
    price = getTextFromElement(prodPrice);
    
    currentProductName = name;
    valuesArray.push(name, desc, price);
    
    // below is not necessary for gallery pages
    // addShipping(name);
   
}


function addToCart(elem) {
    valuesArray = [];
    
    // go up two levels in the doc
    let upOneLevel = elem.parentElement;
    let upTwoLevels = upOneLevel.parentElement;
    let prodName = upTwoLevels.querySelectorAll(".productName");
    let name = getTextFromElement(prodName); 
    
    createLocalObj(upTwoLevels);
    saveObj(name, valuesArray);

    // save the price to separate object to keep track of the total 
    addToTotal("total", price); // PRICE NEEDS TO BE CALLED CORRECTLY HERE

    alert(`${name} added to cart!\nYour subtotal is $${JSON.parse(sessionStorage.getItem("total"))}.\nPlease go to the Cart Page (top right of header) when you are ready to check out.`);
}

/* Old method of adding to cart
function addMe(elem) {
	// go up two levels in the doc
	let upOneLevel = elem.parentElement;
	let upTwoLevels = upOneLevel.parentElement;
	//find the relevant classes
	let prodName = upTwoLevels.querySelectorAll(".productName");
	let prodPrice = upTwoLevels.querySelectorAll(".productPrice");
	let prodDescription = upTwoLevels.querySelectorAll(".productDescription");
	
	// pull the text from each class in the nodelists that are generated above 
	let name = getTextFromElement(prodName);
	let desc = getTextFromElement(prodDescription);
	let price = getTextFromElement(prodPrice);
	
	// check to make sure the text has been imported
	console.log(name, desc, price);

	// Check if item is already present

	// save all to session storage
	saveToSession(name, "name", name);
	saveToSession(name, "desc", desc);
	saveToSession(name, "price", price);

	// save the price to separate object to keep track of the total
	addToTotal("total", price); 


	alert(`${name} added to cart!\nYour subtotal is $${JSON.parse(sessionStorage.getItem("total"))}.\nPlease go to the Cart Page (top right of header) when you are ready to check out.`);

	// add the name to an array in storage as well so that it can be iterated over when populating the cart page? 

}
*/





