require('../models');
const mongoose = require('mongoose');
const handleError = require('../helpers/handleError');

const User = mongoose.model('User');
const Chat = mongoose.model('Chat');

'use strict'

function setUsersToOffLine(ids) {
  const query = {
    id: { $nin: ids }
  };
  const update = {
    $set: { online: false, id: '' }
  };
  return User.update(query, update, { multi: true }).exec();
}

function getUserAndUpdate(username, fields) {
  return User.findOne({ username: username })
    .then(user => {
      Object.keys(fields).forEach(key => {
        user[key] = fields[key]
      });
      return user.save();
    })
    .catch(handleError);
}

function getUser(username) {
  return User.findOne({ username: username }).lean().exec();
}

function getUsers() {
  return User.find({}).sort({ online: -1, username: 1 }).lean().exec();
}

function getContats(username) {
  const query = {
    username: { $ne: username }
  };
  const fields = { username: 1, name: 1, description: 1, online: 1 };

  return User.find(query, fields).lean().exec();
}

function getMessages(username) {
  const query = {
    $or: [{ from: username }, { to: username }]
  };
  return Chat.find(query).exec();
}

function setUserNotificationsToSeen(sender, receiver) {
  const query = {
    username: sender,
    'notifications.username': receiver,
  };
  const update = {
    $set: { "notifications.$.notSeen": 0 },
  };
  return User.update(query, update).exec();
}

function setMessagesToSeen(sender, receiver) {
  return Chat.update({
      from: sender,
      to: receiver
    },
    {
      $set: { seen: true }
    },
    {
      multi: true
    }).exec();
}

function addMessage(chat) {
  const c = new Chat();
  c.from = chat.sender;
  c.to = chat.receiver;
  c.message = chat.message;
  c.seen = chat.seen;
  return c.save();
}

function addUserNotifications(sender, receiver) {
  return User.findOne({ username: receiver })
    .then(user => {
      const notifications = user.notifications.filter(n => n.username === sender);
      if (notifications.length) {
        user.notifications = user.notifications
          .map(n => {
            if (n.username === sender) {
              n.notSeen += 1;
            }
            return n;
          });
      } else {
        user.notifications.push({
          username: sender,
          notSeen: 1,
          lastSeen: null,
        });
      }
      return user.save();
    })
    .catch(handleError);
}

module.exports = {
  setUsersToOffLine,
  getUserAndUpdate,
  getUser,
  getUsers,
  getContats,
  getMessages,
  setMessagesToSeen,
  setUserNotificationsToSeen,
  addMessage,
  addUserNotifications,
};