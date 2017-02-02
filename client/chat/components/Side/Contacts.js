import React, { Component } from 'react';

import { sortBy } from '../../../shared/helpers';
import Contact from './Contact';

export default class Contacts extends Component {
  render() {
    const { contacts, currentUserChat, term, onChangeCurrentUserChat } = this.props;
    const contactNodes = contacts
      .filter(c => ['username', 'name'].some(field => c[field].toLowerCase().match(term.toLowerCase())))
      .sort(sortBy({ online: -1, name: 1 }))
      .reverse()
      .map((user, key) =>
        <Contact
          key={key}
          user={user}
          currentUserChat={currentUserChat}
          onChangeCurrentUserChat={onChangeCurrentUserChat}
        />);

    return (
       <ul className="side-contacts">
        {contactNodes}
       </ul>
    );
  }
}