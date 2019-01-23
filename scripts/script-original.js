// add to cart button should run a function that does the following:

// get the name, price, and image from the item (these should probably all be separate functions the are chained in the addToCart function)

// either store the above in localSession or write it to an object (hash) in the js file

// write these values into the table in the cart page onload
// -----------------




// set the counter in session storage to an initial value
sessionStorage.setItem("count", 1);

// the text portion for the item in the cart
var textPortion = "item";

function getTextFromGallery(elem, textClass) {
	let upOneLevel = elem.parentElement;
	let upTwoLevels = upOneLevel.parentElement;
	return upTwoLevels.querySelectorAll("." + "textClass");
}

function saveToSession(name, key, value) {
	let existing = sessionStorage.getItem(name);
	existing = existing ? JSON.parse(existing) : {};
	existing[key] = value;
	sessionStorage.setItem(name, JSON.stringify(existing));
}


function showMe (name) { 
  return sessionStorage.getItem(name) 
}

function addToCartGallery() {
	let name = getTextFromGallery(elem, "productName");
	saveToSession(name, "name", name);

	let price = getTextFromGallery(elem, "productPrice");
	saveToSession(name, "price", price);

	let desc = getTextFromGallery(elem, "prodDescription");
	saveToSession(name, "desc", desc);

	alert(showMe(name));

}

	/*
	let upOneLevel = elem.parentElement;
	let upTwoLevels = upOneLevel.parentElement;
	
	let prodName = upTwoLevels.querySelectorAll(".productName");
	let prodPrice = upTwoLevels.querySelectorAll(".productPrice");
	let prodDescription = upTwoLevels.querySelectorAll(".productDescription");
	let prodImg = upTwoLevels.querySelectorAll(".productImg")
	// check the counter
	
		// create a json object with the next number		
	
	// increment the counter


	// get the other 2-3 properties (desc, price, img), (optional: store them in vars that can be seen in both scopes)
	
	// add properties to the obj. 

	// write into session storage.
*/




// Next, will need to add onload to write the vals to 

// Note this was not working until added "this" to the onclick and passed it in as an argument;

// https://stackoverflow.com/questions/42213858/how-i-get-parent-id-by-onclick-child-in-js

// Add this method to DOM Notes!
function showParent(elem) {
	let upOneLevel = elem.parentElement;
	let upTwoLevels = upOneLevel.parentElement;
	
	let prodName = upTwoLevels.querySelectorAll(".productName");
	let prodPrice = upTwoLevels.querySelectorAll(".productPrice");
	let prodDescription = upTwoLevels.querySelectorAll(".productDescription");
	let prodImg = upTwoLevels.querySelectorAll(".productImg");
	// console.log();
}

function getTextFromElement(theNode) {
	for (let i = 0; i < theNode.length; i++) {
		thisCart[i] = theNode[i].textContent;  // hmm...going to have to figure out how to name these...or maybe just have it return the text and store in a var? e.g. var name = getTextFromElement(prodName);
		//then use these variables to create an object later?
		// or use a JSON object?


// seems like the easiest way to do this would be to use the name of the product as the name of the object. It should then be pretty straightforward to iterate through the object and pull the 3 values out - e.g. for loop and then ${name}[name], ${name}[description], ${name}[price], etc., for each iteration. 
		
}
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList

// https://css-tricks.com/a-bunch-of-options-for-looping-over-queryselectorall-nodelists/

function setName() {
	return textPortion + sessionStorage.getItem("count");
}

function incrementSessionCounter() {	
	increment = parseInt(sessionStorage.getItem("count")) + 1;
	sessionStorage.setItem("count", increment);
}

// use this to add items to session storage. Syntax: store(currentName, object)
function store(name, val){
	sessionStorage.setItem(name, val);  // not actually sure this is working -- I can't seem to get the vals out...work on this
}

/* old code 

function getNameProductPage() {
	return this.getElementsbyClassName("productName").innterHTML;
}

function getNameGallery() {
	return this.getElementsbyClassName("productName").innterHTML;
}




function incrementAndAssign(counter) {
	
	let tempVar = "item";
	tempVar + counter;
	counter++;
	return tempVar;
}
 
*/ 

// end old code
 