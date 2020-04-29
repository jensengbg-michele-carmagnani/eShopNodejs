
const productContainer = document.querySelector('.gallery');
var num = 0;
//import { getCart } from "cart.js";
//const urlProducts = 'http://localhost:3000/api/products/getAll';


// GET the product form the DB
async function getProducts() {
  try {

    const response = await fetch ( 'http://localhost:3000/api/products/getAll', { method: 'GET' });
    const data = await response.json();
    displayProduct(data);
    return data;

  } catch (error) {
    alert('Unfortunatly occured an error please reload the page', error);

  }
}
getProducts();

// Diplay the products on the web page
async function displayProduct(products) {
  productContainer.innerHTML = '';

  for (product of products) {
    const { urlImg, name, price, id } = product;
    
     productContainer.innerHTML += `<div><img src =${urlImg}><h3>${name} price $${price}</h3><button class="buyProduct" type="submit" value=${id}>Buy</button>
     </div>`;
    }
    getButtons();
     
}

//Post items in the cart
async function postToCart(productID){
  try {

    let id = parseInt(productID);
    console.log(id);
    const response = await fetch ( `http://localhost:3000/api/products/postoCart/${id}`, { method: 'POST' });
    const data = await response.json();
    console.log('The product added is',data.name);
   

  } catch (error) {
    alert('You can only buy one of this product!!! ', error);

  }
 
 }



// get the id product to put into the cart 
 function getButtons(){
     let buyButton = document.querySelectorAll('.buyProduct');
     console.log(buyButton);
     
     for ( let i = 0; i < buyButton.length; i++ ){
       
       buyButton[i].addEventListener('click', () => {
         console.log('hello'); 
         let productID = buyButton[i].value;
     postToCart(productID);
    cartNumber();
   });
  }
 }

 // add the number onto the cart 
 function cartNumber(){
  
  let numberOfProd = document.getElementById('number');
  num++;
  numberOfProd.innerHTML = num;
 return num
  
 }