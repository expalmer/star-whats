import React, { Component } from 'react';

import Avatar from '../Avatar';

export default class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile" id="profile">
        <div className="profile-body">
          <header className="profile-header">
            <div className="profile-info">
              <a href={`/chat/${user.username}#`} className="profile-back">
                <svg x="0px" y="0px" viewBox="0 0 31.494 31.494" width="512px" height="512px">
                  <path d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554  c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587  c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"></path>
                </svg>
              </a>
              <Avatar user={user.username} />
              <h1>{user.username}</h1>
              <q>{user.description}</q>
            </div>
            <span className="profile-bg" style={{ backgroundImage: `url('/img/avatar-${user.username}.jpg')` }}></span>
          </header>
          <ul className="profile-menu">
            <li>One</li>
            <li>Two</li>
          </ul>
        </div>
      </div>
    );
  }
}
