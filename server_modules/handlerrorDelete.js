const getError = ( req, res, db) => {
   
  let ItemToRemove = db.get('cart').find({id : parseInt(req.params.id)}).write();
  if (ItemToRemove) {
    removedItem = db.get('cart').remove({id : parseInt(req.params.id)}).write()
    res.send(removedItem);
    console.log(removedItem);
  } else {
    res.status(404).send('product not existing');
  }
}
exports.getError = getError;