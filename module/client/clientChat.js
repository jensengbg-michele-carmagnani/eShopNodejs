
let SocketIO = io();

const usernameElem = document.querySelector('#message');
const submitButton = document.querySelector('#submit');
const chatMessageImput = document.querySelector('#chat-message');
const sendButton = document.querySelector('#send');
const login = document.querySelector('.login');
const chat = document.querySelector('.chat');
const chatArea = document.querySelector('.chat-area');



function showChat(){
  login.style.display = 'none';
  chat.style.display  = 'block';
}
function typingMessage() {
  document.querySelector('.typingMessage').innerHTML = username + ' typing';
}

function reset() {
  chatMessageImput.value = '';
}

function addMessge(message) {
  let chatMessage = document.createElement('p');
  chatMessage.innerHTML = message;
  chatArea.append(chatMessage);
}


submitButton.addEventListener('click', () => {
  let username = usernameElem.value;
  SocketIO.emit('join', username);
  showChat();
});

sendButton.addEventListener('click', () => {
  let message = chatMessageImput.value;
  console.log(message);
  SocketIO.emit('new message', message);
  reset();
});

SocketIO.on('user join', (user) => {
  addMessge(`The user ${user} has join the chat`);
});

SocketIO.on('message', (chatMessage) => {
  addMessge(chatMessage);
});

SocketIO.on('typing', (username) => {
  typingMessage(username);
});