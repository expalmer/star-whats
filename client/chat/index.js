import React from 'react';
import { render } from 'react-dom';

import { debounce } from '../shared/helpers';
import * as c from './constants';
import store  from './store';
import App from './components/App';

const socket = io();

socket.emit('online', __USER__);
socket.on('online', onOnline);
socket.on('userOnline', onUserOnline);
socket.on('userOffline', onUserOffline);
socket.on('receiveMessage', onReceiveMessage);
socket.on('messagesSeen', onMessagesSeen);
socket.on('notSeenMessage', onNotSeenMessage);
socket.on('userTyping', onUserTyping);

// IO HANDLERS
function onOnline(data) {
  store.dispatch({ type: c.INITIAL, data });
  const { currentUserChat } = data.user;
  if (currentUserChat) {
    onChangeCurrentUserChat(currentUserChat);
  }
}

function onUserOnline(username) {
  store.dispatch({ type: c.USER_ONLINE, username });
}

function onUserOffline(username) {
  store.dispatch({ type: c.USER_OFFLINE, username });
}

function onReceiveMessage(message) {
  store.dispatch({ type: c.ADD_MESSAGE, message });
}

function onMessagesSeen(receiver) {
  store.dispatch({ type: c.MESSAGE_SEEN, receiver });
}

function onNotSeenMessage(notifications) {
  store.dispatch({ type: c.MESSAGE_NOT_SEEN, notifications });
}

function onUserTyping(sender) {
  store.dispatch({ type: c.USER_TYPING, sender });
}

function stopTyping() {
  store.dispatch({ type: c.USER_TYPING, sender: '' });
}

// EVENT HANDLERS
function onChangeCurrentUserChat(receiver) {
  socket.emit('openChat', receiver);
  store.dispatch({ type: c.OPEN_CHAT, receiver });
}

function onChangeSearchTerm(term) {
  store.dispatch({ type: c.SEARCH_TERM, term });
}

function onChangeInputValue(value) {
  if (value) {
    const receiver = store.getState().user.currentUserChat;
    socket.emit('userTyping', receiver);
  }
  store.dispatch({ type: c.INPUT_VALUE, value });
}

function onSendMessage(receiver, value) {
  if (!value) {
    return false;
  }
  socket.emit('sendMessage', receiver, value);
  store.dispatch({ type: c.INPUT_VALUE, value: '' });
}

function onToggleOptions() {
  store.dispatch({ type: c.TOGGLE_OPTIONS });
}

function onToggleEmoji() {
  store.dispatch({ type: c.TOGGLE_EMOJI });
}

function onSelectEmoji(value) {
  store.dispatch({ type: c.SELECT_EMOJI, value });
}

function onClearMessages() {
  console.log('IMPLEMENTAR');
}

const onKeepTyping = debounce(stopTyping, 3000);

const events = {
  Side: {
    onChangeCurrentUserChat,
    onChangeSearchTerm,
  },
  Chat: {
    onChangeInputValue,
    onSendMessage,
    onToggleOptions,
    onToggleEmoji,
    onSelectEmoji,
    onClearMessages,
    onKeepTyping,
  }
};

// RENDER
function appRender() {
  const data = store.getState();
  render(<App data={data} events={events} />, document.getElementById('app'));
}

store.subscribe(appRender);