const { h, diff, patch } = require('virtual-dom');
const createElement = require('virtual-dom/create-element');
const { sortBy, splitEvery } = require('../shared/helpers');

var USERS = __USERS__;

const socket = io();
socket.on('userOnline', onUserOnline);
socket.on('userOffline', onUserOffline);

function onUserOnline(username) {
  updateUser(username, true, compare);
}

function onUserOffline(username) {
  updateUser(username, false, compare);
}

function updateUser(username, value, cb) {
  USERS = USERS
    .map(user => {
      if (user.username === username) {
        user.online = value;
      }
      return user;
    })
    .sort(sortBy({'online': -1, username: 1 }))
  cb();
}

function User(user) {
  return (
    h('a', { href: `/chat/${user.username}`, className: `user${user.online ? ' online' : ''}`, target: '_blank' },
      [
        h('span', { className: 'avatar'},
          [
            h('img', { src: `/img/avatar-${user.username}.jpg`, alt: user.name })
          ]
        ),
        h('h2', {}, user.username)
      ]
    )
  );
}

function Item(item) {
  const userNodes = item.map(User);
  return h('div', { className: 'user-wrap' }, [...userNodes]);
}

function render(users = []) {
  const datas = splitEvery(users, 3);
  const itemNodes = datas.map(Item);
  return h('div', {}, [...itemNodes]);
}

function compare() {
  var newTree = render(USERS);
  var patches = diff(currentTree, newTree);
  rootNode = patch(rootNode, patches);
  currentTree = newTree;
}

var currentTree = render(USERS);
var rootNode = createElement(currentTree);
document.getElementById("app").appendChild(rootNode);
