import React, { Component } from 'react';
import { classnames } from '../../../shared/helpers';

export default class DropDown extends Component {
  render() {
    const { options, onClearMessages } = this.props;
    const className = classnames({
      'chat-dropdown': true,
      'opened': options,
    });
    return (
      <div className={className}>
        <ul>
          <li>
            <a href="#" onClick={onClearMessages}>Clear Messages</a>
          </li>
        </ul>
      </div>
    );
  }
}