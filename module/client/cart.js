//get body ele
const gallery =  document.querySelector('.shopping-cart');


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
 gallery.innerHTML = '';
 console.log(cartItems);
 gallery.innerHTML += ` <section class="title">
                            Shopping Bag
                        </section>`;
 for (cartItem of cartItems){
  const { urlImg, name, price } = cartItem;
   gallery.innerHTML += `

  
   <section class="item">
   <section class="buttons">
     <span class="delete-btn"></span>
     <span class="like-btn"></span>
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

 
`
 }


}
getCart();
