import React, { Component } from 'react';

import Header from './Header';
import DropDown from './DropDown';
import Messages from './Messages';
import Input from './Input';
import Emoji from './Emoji';

export default class Chat extends Component {
  render() {
    const { user, contacts, messages, input, typing, options, emoji, events } = this.props;
    const sender   = user.username;
    const receiver = user.currentUserChat;
    const contact  = contacts.filter(c => c.username === receiver)[0];
    const chats    = messages.filter(m => m.from === receiver || m.to === receiver) || [];

    if (!contact) {
      return null;
    }

    if (typing) {
      events.onKeepTyping();
    }

    return (
      <div className="chat">
        <div className="chat-body">
          <Header user={contact} onToggleOptions={events.onToggleOptions} />
          <DropDown options={options} onClearMessages={events.onClearMessages} />
          <Messages
            messages={chats}
            sender={user.username}
            receiverIsOnline={contact.online}
            whoIsTyping={typing}
          />
          <Input
            receiver={receiver}
            input={input}
            onChangeInputValue={events.onChangeInputValue}
            onSendMessage={events.onSendMessage}
            onToggleEmoji={events.onToggleEmoji}
          />
          <Emoji
            receiver={receiver}
            emoji={emoji}
            onSelectEmoji={events.onSelectEmoji}
          />
        </div>
      </div>
    );
  }
}
