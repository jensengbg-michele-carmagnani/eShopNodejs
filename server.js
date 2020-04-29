const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);



const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('products.json');
const db = low(adapter);
const port =  process.env.PORT || 3000;



// module statement 
const errorDelete = require('./server_modules/handlerrorDelete');
const errorPost = require('./server_modules/handlerrorPost');
const startChat = require('./serverChat');

// methods 
app.use(express.static('module'));
app.use(express.json());



// INIT DATA BASE 
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
  //post module ---> from handlerrorPost.js
  errorPost.getErrorPost(req, res, db);
});



//DELETE the product from the cart db
app.delete('/api/cart/delete/:id', (req,res) =>{
  //delete module---> from handlerorrDelete.js
  errorDelete.getError(req, res, db);
  
});


// GET ALL items from the cart db
app.get("/api/cart/getAll", (req, res) => {
  const cartAll = db.get('cart').value();
  res.send( cartAll);
})



//CHAT ----> from serverChat.js
startChat.chat(io);

// HTTP SERVER 
http.listen(port,() => {
  console.log(`Server running on port:${port} `)
});
