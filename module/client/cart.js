//get body ele
const gallery =  document.querySelector('.shopping-cart');

let totalPrice = 0;

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
 gallery.innerHTML += ` <section class="title">
                            Shopping Bag
                        </section>`;
  for (cartItem of cartItems){
    const { urlImg, name, price,id } = cartItem;
    totalPrice = totalPrice + parseInt(price);
    gallery.innerHTML += `

  
   <section class="item" value=${id}>
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
 </section>`
 
}
gallery.innerHTML += `<section class="totalPrice">

 <section class="total-price"><p>Total price :</p><p>${totalPrice}</p></section>
</section>`

getAllDeletes();
}

async function getAllDeletes(){
  let deleteProduct = document.querySelectorAll('.delete-bnt')  ;
  console.log(deleteProduct);
  
  for ( let i = 0; i < deleteProduct.length; i++ ){
    
    deleteProduct[i].addEventListener('click', function () {
      productId = deleteProduct[i].value;
      deleteItems(productId);
      deleteCartSection(productId);
    });
  }

}
async function deleteItems(){

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
