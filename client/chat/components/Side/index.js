import React, { Component } from 'react';
import Avatar from '../Avatar';
import Header from './Header';
import Search from './Search';
import Contacts from './Contacts';

export default class Side extends Component {
  render() {
    const { user, contacts, term, input, events } = this.props;
    const { currentUserChat } = user;
    return (
      <div className="side">
        <Header user={user} />
        <Search
          term={term}
          onChangeSearchTerm={events.onChangeSearchTerm}
        />
        <Contacts
          contacts={contacts}
          currentUserChat={currentUserChat}
          term={term}
          onChangeCurrentUserChat={events.onChangeCurrentUserChat}
        />
      </div>
    );
  }
}