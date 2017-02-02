import React, { Component } from 'react';
import Avatar from '../Avatar';

export default class Typing extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="msg">
        <div className="message message-in message-typing">
          <Avatar user={user} />
          <div className="typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}