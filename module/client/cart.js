
//Post item in the cart 
export async function getCart(productID){
  try {

    let id = parseInt(productID);
    console.log(id);
    const response = await fetch ( `http://localhost:3000/api/products/postOne/${id}`, { method: 'POST' });
    const data = await response.json();
    console.log('The product added is',data.name);
    return data;

  } catch (error) {
    alert('You can only buy one of this product!!! ', error);

  }
 }
