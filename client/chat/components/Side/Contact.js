import React, { Component } from 'react';
import { classnames } from '../../../shared/helpers';
import Avatar from '../Avatar';

export default class Contact extends Component {
  render() {
    const { user, currentUserChat, onChangeCurrentUserChat } = this.props;
    const className = classnames({
      contact: true,
      online: user.online,
      active: currentUserChat === user.username,
    });
    const text = user.online ? 'Online' : 'Offline';
    const total = user.notSeen ? <b>{user.notSeen}</b> : null;
    return (
       <li className={className} onClick={() => onChangeCurrentUserChat(user.username)}>
         <Avatar user={user.username} />
         <h4>
            {user.name}
            <small>
              <span className="circle"></span> {text}
            </small>
            {total}
          </h4>
       </li>
    );
  }
}
