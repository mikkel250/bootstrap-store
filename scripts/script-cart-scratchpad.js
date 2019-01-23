// to add the title and description elements to the cart table, use the following:

// name the cart body as a var for easier access later 
var cartBody = document.getElementById("cart-body");

//Add a new row to the table first
var rowElement = document.createElement("tr");
cartBody.appendChild(rowElement);

// to create and add new columns/cells (td element)
var tdElement = document.createElement("td");

//create title element and add attributes, text content
tdElement.dataset.th= 'Title';

tdElement.textContent = "Test Title";

cartBody.lastChild.classList.add("h5");

cartBody.appendChild(titleElement);


// add desc element
var descElement = document.createElement("td");

descElement.dataset.th = "Description";

descElement.textContent = "A test description";

cartBody.appendChild(descElement);


/* so I think that I can zip each of the above processes up into little functions and then use the function in a loop that goes over each sessionStorage item and adds the textContent as it goes through. Should be pretty easy because I can just call the various keys on each item as it loops through, e.g.
titleElement.textContent = i.name;
descElement.textContent = i.desc;
etc.

*/
DRILLING DOWN DOM
So from what I have seen, it is possible to drill further down into the DOM, for example, I could identify the last row using cartBody.row.length, or just do 
document.querySelector('.cart-body > lastRow')

function testAdd() {
    let cartBody = document.getElementById("cart-body");
    let lastRow = (cartBody.rows[cartBody.rows.length -1]);
    let tdElement = document.createElement("td");
    tdElement.dataset.th = "Option";
    tdElement.textContent = "Test Add";
    lastRow.insertCell(tdElement);
}
// For some reason, the text content etc are not being added when I do it in the way above
cartBody.rows[1].cells // this will give you a collection of cells in that row

// I could write a little function that runs every time something is added to the table so that the cell is assigned as you go, such as the w3 example, slightly modified below. From running it, it has the effect of continuously adding new cells into a single row. 
function myFunction() {
    var cartBody = document.getElementById("cart-body");
    let lastRow = (cartBody.rows[cartBody.rows.length - 1]); // gets the last row of the table
    cartBody.insertRow(lastRow + 1);
    let x = lastRow.insertCell(-1); //inserts a cell at the end of the row
    x.innerHTML = "New cell";
}

//the below will add a new row with 2 cells (to a 2 column table) each time it is run (I modified this one too). I think the addCell function I wrote could be modified such that it adds a row and 5 cells each time it is run (use and call a separate function to add the cells, I think). Just pass in the array/object and do it that way.
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_table_insertrow
function addBottomRow() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}


// console checking if add button is working and results
let lastRow = (cartBody.rows[cartBody.rows.length - 1]);
var cell5 = lastRow.insertCell(-1);


let newBtn = document.createElement("input");
    newBtn.type = "button";
    newBtn.className = "btn";

newBtn.style.color = "red";
newBtn.value = "Remove";
newBtn.setAttribute("onClick", removeItem(this));
cell5.appendChild(newBtn);



/* no need to add this since it's in the JS
function removeItem(item) {
  let thisRow = item.rowIndex;
  cartBody.deleteRow(thisRow);
}
*/
/* old code for remove button
var cell5 = row.insertCell(-1);
    let newBtn = document.createElement("input");
    newBtn.type = "button";
    newBtn.className = "btn";
    newBtn.onclick = removeItem(this);
    //cell5.dataset.th = type; // this is screwing it up somehow?

    //newBtn.setAttribute("onClick", removeItem(this));
    //newBtn.classList.add("fa");
    //newBtn.classList.add("fa-close");
    //newBtn.style.color = "red";
    //newBtn.textContent = secondVal;
    cell5.appendChild(newBtn);
    */

    /* Notes from script-cart-insert-version
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