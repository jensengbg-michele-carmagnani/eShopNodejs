//get body ele
const gallery =  document.querySelector('.shopping-cart');

console.log(gallery);
  //console.log('bodLoader',boxLoader);


//function loader
function initLoader(){
  let boxLoader = document.querySelector('.boxLoader');
  console.log('bodLoader',boxLoader);
  setTimeout(() => {
  boxLoader.style.opacity = 0;
  boxLoader.style.display = 'none';
  gallery.style.display = 'block';
    setTimeout(() => {
      gallery.style.opacity = 1;
    }, 50);

  }, 4000);
}


//Post item in the cart 
  async function getCart(){
  try {

    
    
    const response = await fetch ( `http://localhost:3000/api/cart/getAll`, { method: 'GET' });
    const data = await response.json();
    console.log('The product added is',data);
    displayCart(data);
    return data
    
    

  } catch (error) {
    alert('You can only buy one of this product!!! ', error);

  }
 }

 function displayCart (cartItems){
   let totalPrice = 0;    
 gallery.innerHTML = '';
 gallery.innerHTML += ` <section class="title">
                            Shopping Bag
                        </section>`;

  gallery.innerHTML += `<div class = "boxLoader">
                        <div class="loader">
                          <div class="circle"></div>
                          <div class="circle"></div>
                        </div>`
  for (cartItem of cartItems){
    const { urlImg, name, price,id } = cartItem;
    totalPrice = totalPrice + parseInt(price);
    gallery.innerHTML += `

  
   <section class="item " value=${id}>
   <section class="buttons">
     <button class="delete-btn" value=${id}></button>
     <span class="like-btn heart"></span>
   </section>
 
  <section class="image">
    <img src=${urlImg} alt="" />
  </section>
 
  <section class="description">
    <span>${name}</span>
  </section>
 
  <section class="quantity">
     <button class="plus-btn" type="button" name="button">
      +
     </button>
     <input type="text" name="name" value="1">
     <button class="minus-btn" type="button" name="button">
       -
     </button>
  </section>
  
  <section class="total-price">${price}</section>
 </section>
 </div>`
 
}
gallery.innerHTML += `<section class="totalPrice">

 <section class="total-price"><p>Total price :</p><p>${totalPrice}</p></section>
</section>`

getCartButtons(); 
}

async function getCartButtons(){
  let deleteProduct = document.querySelectorAll('.delete-btn')  ;
  console.log(deleteProduct);
  
  for ( let i = 0; i < deleteProduct.length; i++ ){
    
    deleteProduct[i].addEventListener('click', function () {
      productId = parseInt(deleteProduct[i].value);
      deleteItems(productId);
      getCart();
    });
  }

}
async function deleteItems(id){

  try{
  const response = await fetch(`http://localhost:3000/api/cart/delete/${id}`, {method:  'DELETE'});
  const data = await response.json();
  
  return data

  } catch (error){
    alert('the product is not existing')
  }
}

async function deleteCartSection(){
  let cartSection = document.querySelector('.item').getAttribute();
  cartSection.innerHTML = '';
}

getCart();
initLoader();
