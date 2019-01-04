'use strict';

const io = require('socket.io')(3000);

let cnt = 0;
let counter = 0;
let letter = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

io.on('connection', (socket) => {
  socket.on('');
});

const numbers = io.of('/numbers');
const letters = io.of('/letters');


numbers.on('connection', socket =>{
  console.log(`connected to numbers`, socket.id);

  socket.on('join', (room, cb) => {
    socket.join(room);
    cb && cb(`Joined ${room}`);
  });

  socket.on('next-number', (counter) =>{
    socket.broadcast.emit('number', counter++);
  }).then(counter =>{
    socket.broadcast.emit('_number', counter--);
  });

});

letters.on('connection', socket => {
  console.log('connected to letters', socket.id);

  socket.on('join', (room, cb) => {
    socket.join(room);
    cb && cb(`Joined ${room}`);
  });

  socket.on('next-letter', (letter) =>{
    socket.broadcast.emit('letter', letter[cnt].toUpperCase());
    cnt++;
  }).then(letter =>{
    socket.broadcast.emit('_letter', letter[cnt]);
  });

});