const express = require('express');
const app = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('products.json');
const db = low(adapter);


// module statement 
const errorDelete = require('./serverModules/handlerrorDelete');
const errorPost = require('./serverModules/handlerrorPost');
app.use(express.static('module'));


const port = process.env.PORT || 3000;
app.use(express.json());


function initDB(){
  db.defaults({ products: [], cart:[] }).write();
  db.get('cart').remove().write();
}


// GET all the products from PRODUCT DB // Hämta varukorgen med alla tillagda produkter.
app.get('/api/products/getAll',(req,res, ) =>{
   initDB(); // init cart db
  allProducts = db.get('products').value();
  res.send(allProducts);
  console.log(allProducts);
});


//  POST --> add the product selected from "PRODUCT db"  into "CART db"
app.post('/api/products/postoCart/:id', (req,res) => {
  //call the module 
  errorPost.getErrorPost(req, res, db);
  });



//DELETE the product from the cart db
  app.delete('/api/cart/delete/:id', (req,res) =>{
    //call the module  handlerorrDelete
   errorDelete.getError(req, res, db);
    
});


// GET ALL items from the cart db
app.get("/api/cart/getAll", (req, res) => {
  const cartAll = db.get('cart').value();
  res.send(cartAll);
})
  






app.listen(port,() => {
  console.log(`Server running on port: ${port}`)
  
});
