const express     = require('express');
const mongoose    = require('mongoose');
const app         = express();
const http        = require('http').Server(app);
const bodyParser  = require('body-parser');
const io          = require('socket.io')(http);
const store       = require('./app/store');
const handleError = require('./app/helpers/handleError');
const config = {
  port: (process.env.PORT || 9999),
  mongo: (process.env.MONGO_URL || 'mongodb://localhost/whats')
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Views
app.set('views', './app/views');
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  store.getUsers()
    .then(users => {
      res.render('index', { users });
    })
    .catch(handleError);
});

app.get('/chat/:user', (req, res, next) => {
  const user = req.params.user;
  store.getUser(user)
    .then(user => {
      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        next(err);
      }
      res.render('chat', { user: user.username });
    })
    .catch(handleError);
});

// Errors: catch 404 and forward to Error Handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// IO Connected
io.on('connection', (socket) => {

  // Set to offline users that doesnt online anymore
  const socketIds = Object.keys(io.of('/').connected).map(key => key);
  store.setUsersToOffLine(socketIds);

  // ONLINE
  socket.on('online', newUser => {
    function afterGetAllDatas ([user, contacts, messages]) {
      socket.user = user;
      //=> EMIT: online
      socket.emit('online', {
        user,
        contacts,
        messages,
      });
      //=> EMIT:userOnline
      socket.broadcast.emit('userOnline', newUser);
    }
    Promise.all([
      store.getUserAndUpdate(newUser, { id: socket.id, online: true }),
      store.getContats(newUser),
      store.getMessages(newUser),
    ])
    .then(afterGetAllDatas)
    .catch(handleError);
  });

  socket.on('disconnect', () => {
    if (typeof socket.user === "undefined") {
      return false;
    }
    const username = socket.user.username;
    store.getUserAndUpdate(username, { id: '', online: false })
      .then(user => {
        //=> EMIT:userOffline
        socket.broadcast.emit('userOffline', username);
      })
      .catch(handleError);
  });

  // change the currentUser
  socket.on('openChat', username => {
    const sender   = socket.user.username;
    const receiver = username;

    Promise.all([
      store.getUserAndUpdate(sender, { currentUserChat: receiver }),
      store.getUser(receiver),
      store.setMessagesToSeen(receiver, sender),
      store.setUserNotificationsToSeen(sender, receiver),
    ])
      .then(([senderUser, receiverUser, chat, notification]) => {
        //=> EMIT:messagesSeen
        socket.broadcast.to(receiverUser.id).emit('messagesSeen', sender);
      })
      .catch(handleError);
  });

  // sendMessage
  socket.on('sendMessage', (receiver, message) => {
    const sender = socket.user.username;
    store.getUser(receiver)
      .then(receiverUser => {
        const isChatingWithReceiver = (receiverUser.currentUserChat === sender && receiverUser.online);
        const chatMessage = {
          sender: sender,
          receiver: receiver,
          message: message,
          seen: isChatingWithReceiver,
        };
        store.addMessage(chatMessage)
          .then(objMessage => {
            //=> EMIT:receiveMessage
            socket.emit('receiveMessage', objMessage);
            socket.broadcast.to(receiverUser.id).emit('receiveMessage', objMessage);
            if (!isChatingWithReceiver) {
              store.addUserNotifications(sender, receiver)
                .then(user => {
                  //=> EMIT:notSeenMessage
                  socket.broadcast.to(receiverUser.id).emit('notSeenMessage', user.notifications);
                })
                .catch(handleError);
            }
          })
          .catch(handleError);
      })
      .catch(handleError);
  });

  socket.on('userTyping', receiver => {
    const sender = socket.user.username;
    store.getUser(receiver)
      .then(receiverUser => {
        const isChatingWithReceiver = receiverUser.currentUserChat === sender;
        if (isChatingWithReceiver) {
          socket.broadcast.to(receiverUser.id).emit('userTyping', sender);
        }
      })
      .catch(handleError);
  });

});

// Start Server
connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  http.listen(config.port, () => {
    console.info('==> 🌎 Listening on port %s', config.port);
  });
}

function connect () {
  return mongoose.connect(config.mongo).connection;
}
