import React, { Component } from 'react';
import { classnames, toDate } from '../../../shared/helpers';
import Avatar from '../Avatar';

export default class Message extends Component {
  render() {
    const { sender, message } = this.props;
    const itsMine = sender === message.from;
    const msgClass = classnames({
      'message-out': itsMine,
      'message-in': !itsMine,
       message: true
    });
    const staClass = classnames({
      'seen': itsMine && message.seen,
      'message-status': true
    });
    const iconSeen = <svg className="icon-read" viewBox="0 0 594.149 594.149"> <path d="M448.8,161.925l-35.7-35.7l-160.65,160.65l35.7,35.7L448.8,161.925z M555.899,126.225l-267.75,270.3l-107.1-107.1 l-35.7,35.7l142.8,142.8l306-306L555.899,126.225z M0,325.125l142.8,142.8l35.7-35.7l-142.8-142.8L0,325.125z"></path> </svg>;
    const seen = itsMine ? iconSeen : null;

    // if (userTyping) {
    //   messageNodes.push(ChatTyping(userTyping));
    // }
    return (
      <div className="msg">
        <div className={msgClass}>
          <Avatar user={message.from} />
          {message.message}
          <div className={staClass}>
            <span>
              {toDate(message.sent)} {seen}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
