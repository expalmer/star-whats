import React, { Component } from 'react';

export default class Header extends Component {
  render(props) {
    const { user } = this.props;
    return (
      <header className="side-header" style={{ backgroundImage: `url('/img/avatar-${user.username}.jpg')` }}>
        <a href={`/chat/${user.username}#profile`} className="side-menu">
          <svg className="icon-menu" x="0px" y="0px" viewBox="0 0 484.975 484.975"><path d="M462.419,165.912H22.556c0,0-22.556,0-22.556-38.287s22.556-38.287,22.556-38.287h439.863 c0,0,22.556,0,22.556,38.287S462.419,165.912,462.419,165.912z"></path><path d="M462.419,280.776H22.556c0,0-22.556,0-22.556-38.288S22.556,204.2,22.556,204.2h439.863 c0,0,22.556,0,22.556,38.287C484.975,280.776,462.419,280.776,462.419,280.776z"></path><path d="M462.419,395.637H22.556c0,0-22.556,0-22.556-38.286c0-38.288,22.556-38.288,22.556-38.288 h439.863c0,0,22.556,0,22.556,38.288C484.975,395.637,462.419,395.637,462.419,395.637z"></path></svg>
        </a>
        <h1 className="side-title">
          {user.name}<q>{user.description}</q>
        </h1>
      </header>
    );
  }
}