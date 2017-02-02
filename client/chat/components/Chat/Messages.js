import React, { Component } from 'react';
import Message from './Message';
import Typing from './Typing';

export default class Messages extends Component {
  componentDidMount() {
    console.log('Messages.componentDidMount');
    this.scroll();
  }
  componentDidUpdate(oldProps) {
    const { messages, typing } = this.props;
    if (oldProps.messages.length !== messages.length) {
      console.log('Messages Scroll');
      this.scroll();
    }
  }
  scroll() {
    console.log('Messages.scroll');
    this.chatList.scrollTop = this.chatList.scrollHeight;
  }
  render(props) {
    const { sender, messages, whoIsTyping } = this.props;
    const messageNodes = messages
      .map((message, key) => <Message key={key} sender={sender} message={message} />);
    if (whoIsTyping) {
      console.log('whoIsTyping', whoIsTyping);
      messageNodes.push(<Typing key={messageNodes.length} user={whoIsTyping} />);
    }
    return (
      <div className="chat-list" ref={(div) => { this.chatList = div; }}>
        <div className="chat-messages">
          {messageNodes}
        </div>
      </div>
    );
  }
}
