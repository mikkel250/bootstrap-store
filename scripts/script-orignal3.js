
/*
 Script for gallery pages Add To Cart functionality
*/
function objCreator(name, key, value) {
	new Object = name {
	"name" = name;
	"desc" = key;
	"price" = value;
	}
}

function getTextFromElement(theNode) {
	for (let i = 0; i < theNode.length; i++) {
		return theNode[i].textContent;
	}
}

function addToTotal(name, theNumber) {
	// pull the current value out of storage
	let currentTotal = JSON.parse(sessionStorage.getItem(name));
	// if there is nothing in storage, set it to zero
	currentTotal = currentTotal ? currentTotal : 0;
	console.log(currentTotal);
	// add the current item's price to the total pulled from storage
	let updatedTotal = currentTotal + parseFloat(theNumber);
	console.log(updatedTotal);
	// save the updated value back to storage
	sessionStorage.setItem(name, JSON.stringify(updatedTotal));
}


function getTextFromGallery(elem, classes) {
	classes.each 
	getTextFromElement(thisElem);
}

function saveToSession(name, key, value, quantity = 1) {
	let existing = sessionStorage.getItem(name);
	//existing = existing ? JSON.parse(existing) : {};
	// refactor of the above to allow multiple items to be added
	if (existing) {
		JSON.parse(existing);
		existing[key] = value;
		existing["quantity"] = existing["quantity"] + quantity;
		sessionStorage.setItem(name, JSON.stringify(existing));
	} else {
		let localObj = {key: value, "quantity": quantity};
		console.log(localObj);
		sessionStorage.setItem(name, JSON.stringify(localObj));
	}
}


function showMe (name) { 
  return sessionStorage.getItem(name);
}


function addToCartGallery(elem) {
	let name = getTextFromGallery(elem, ".productName");
	console.log(name);
	//saveToSession(name, "name", name);
/*
	let price = getTextFromGallery(elem, ".productPrice");
	saveToSession(name, "price", price);

	let desc = getTextFromGallery(elem, ".prodDescription");
	saveToSession(name, "desc", desc);
*/
	//alert(showMe(name));

}



function AddMe(elem) {
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
	saveToSession(name, "desc",desc);
	saveToSession(name, "price", price);

	// save the price to separate object to keep track of the total
	addToTotal("total", price); 


	alert(`${name} added to cart!\nYour subtotal is $${JSON.parse(sessionStorage.getItem("total"))}.\nPlease go to the Cart Page (top right of header) when you are ready to check out.`);

	// add the name to an array in storage as well so that it can be iterated over when populating the cart page? 

}

// maybe instead of addToCartGallery, use this function to set global variables that get reassigned each time a button is clicked? 
// Then add them to session storage at that point? Or save them to an array and use that to run the session storage saver?

// am also going to need to find a way to prevent multiple adds to cart if an item is already in there



