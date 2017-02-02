import React, { Component } from 'react';
import { classnames } from '../../../shared/helpers';

import Avatar from '../Avatar';

export default class Header extends Component {
  render() {
    const { user, onToggleOptions } = this.props;
    const className = classnames({
      'chat-options': true,
      'opened': false,
    });

    return (
      <header className="chat-header">
        <div className="chat-avatar">
          <Avatar user={user.username} />
        </div>
        <div className="chat-info">
          <h1>
            {user.name}
            <small>{user.description}</small>
          </h1>
          <span className={className} onClick={onToggleOptions}>
            <svg className="icon-points" viewBox="0 0 408 408"><path d="M204,102c28.05,0,51-22.95,51-51S232.05,0,204,0s-51,22.95-51,51S175.95,102,204,102z M204,153c-28.05,0-51,22.95-51,51 s22.95,51,51,51s51-22.95,51-51S232.05,153,204,153z M204,306c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51 S232.05,306,204,306z"></path></svg>
          </span>
        </div>
      </header>
    );
  }
}
