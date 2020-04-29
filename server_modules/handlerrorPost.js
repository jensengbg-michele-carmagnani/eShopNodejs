
const getErrorPost = (req, res, db) =>{
    
  let product = db.get('products').find({id :parseInt(req.params.id)}).value(); //name : req.params.name, urlImg : req.params.urlImg, price : req.params.price
  // if the prodcut existing into the products db
  if (!product) return res.status(404).send('The product selected is not existing');
  
  // if the product is already existing into the cart db
  let productExists = db.get('cart').find({id :parseInt(req.params.id)}).value(); //search the database for already existing user
    if (productExists) {
        res.send('product already existing you are not allow to take it!!');
    } else {
        db.get('cart').push(product).write();
        console.log('This is the product selected :', product);
    }
  
  res.send(product);
}

exports.getErrorPost = getErrorPost