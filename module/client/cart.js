//get body ele
const gallery =  document.querySelector('.shoppingCart');
console.log(gallery);
  //console.log('bodLoader',boxLoader);



function initLoader(){
  let loader = document.querySelector('.wrapper');
  console.log('loader',loader);
  setTimeout(() => {
  loader.style.opacity = 0;
  loader.style.display = 'none';
  gallery.style.display = 'block';
    setTimeout(() => {
      gallery.style.opacity = 1;
    }, 100);

  }, 2000);
}


//Post item in the cart 
  async function getCart(){
  try {

    
    
    const response = await fetch ( `http://localhost:3000/api/cart/getAll`, { method: 'GET' });
    const data = await response.json();
    console.log('The product added is',data);
    displayCart(data);
    initLoader();
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


 for (cartItem of cartItems){
   const { urlImg, name, price,id } = cartItem;
   totalPrice = totalPrice + parseInt(price);
   gallery.innerHTML += `
 
  <section class="item " value=${id}>
  <section class="buttons">
    <button class="delete-btn" value=${id}>Delete</button>
    
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
    
    deleteProduct[i].addEventListener('click',  () => {
      productId = parseInt(deleteProduct[i].value);
      deleteItem(productId);
    
      getCart();
    });
  }

}
async function deleteItem(id){

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
//initLoader();
