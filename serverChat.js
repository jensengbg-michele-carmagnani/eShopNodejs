 


  


// Chat implementation
const chat = function chat (io){

  io.on('connection', (socket) =>{
    console.log('user connected');
    socket.on('join', (user) =>{
      socket.username = user;
      console.log(user);
      socket.broadcast.emit('user join', user);
    });
  
    socket.on('new message', (message) =>{
      let composeMessage = socket.username + ': ' + message;
      console.log('message is :', composeMessage);
      io.emit('message', composeMessage);
    });
  
    socket.on('typing', () => {
      socket.broadcast.emit('typing', socket.username);
    });
  }); 
}
exports.chat = chat;