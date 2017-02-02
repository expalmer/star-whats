import React, { Component } from 'react';

export default class Avatar extends Component {
  render() {
    const { user } = this.props;
    return (
      <span className="avatar">
        <img src={`/img/avatar-${user}.jpg`} alt={user} />
      </span>
    );
  }
}