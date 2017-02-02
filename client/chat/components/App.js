import React, { Component } from 'react';
import Profile from './Profile';
import Side from './Side';
import Chat from './Chat';

function mergeContacts(user, contacts) {
  return contacts.map(c => {
    c.notSeen = 0;
    c.lastSeen = null;
    const notification = user.notifications.filter(n => n.username === c.username);
    if (notification.length) {
      const item = notification[0];
      c.notSeen = item.notSeen;
      c.lastSeen = item.lastSeen;
    }
    return c;
  });
}

export default class App extends Component {
  render() {
    const { data, events } = this.props;
    const { user, contacts, messages, controls } = data;
    const { term, input, options, emoji, typing } = controls;
    const contactsWithNotifications = mergeContacts(user, contacts);
    return (
      <div className="app">
        <Profile user={user} />
        <Side
          user={user}
          contacts={contactsWithNotifications}
          term={term}
          events={events.Side}
        />
        <Chat
          user={user}
          contacts={contacts}
          messages={messages}
          input={input}
          typing={typing}
          options={options}
          emoji={emoji}
          events={events.Chat}
        />
      </div>
    );
  }

}