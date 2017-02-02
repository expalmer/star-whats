import React, { Component } from 'react';
import { classnames } from '../../../shared/helpers';

export default class Emoji extends Component {
  render() {
    const { receiver, emoji, onSelectEmoji } = this.props;
    if (!receiver) {
      return null;
    }
    const className = classnames({
      'chat-emoji': true,
      open: emoji
    });
    const handleClick = (value) => onSelectEmoji(value);
    const emojiNodes = ['😆', '😀', '😎', '😘', '😅', '😠' ,'👻']
      .map((item, key) => (<span key={key} onClick={() => handleClick(item)}>{item}</span>));

    return (
      <div className={className}>
        {emojiNodes}
      </div>
    );
  }
}
