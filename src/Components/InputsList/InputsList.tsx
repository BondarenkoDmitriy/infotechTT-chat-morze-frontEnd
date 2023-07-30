/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import classNames from 'classnames';
import socket from '../../utils/socketSetup';
import { Button } from '../../Controls/Button/Button';
import './inputsList.scss';
import { Input } from '../../Controls/Input/Input';

interface Props {
  username: string;
}

export const InputsList: FC<Props> = ({ username }) => {
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recipientUsername, setRecipientUsername] = useState<string>('');

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      socket.emit('privateMessage', { toUser: recipientUsername, fromUser: username, text: messageInput.trim() });
    }

    setMessageInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let hasError = false;

    inputValue.split('').forEach((char) => {
      if (char !== '.' && char !== '-' && char !== ' ') {
        setError('Please enter Morse code characters only (. or -)');
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }

    setError(null);
    setMessageInput(inputValue);
  };

  return (
    <div className="inputs">
      <label>
        Welcome:
        {username}
      </label>
      <Input
        placeholder="Recipient Name"
        value={recipientUsername ?? ''}
        onChange={(e) => setRecipientUsername(e.target.value)}
        classes="inputs__field"
      />
      <Input
        placeholder="Type your message..."
        value={messageInput}
        onChange={handleInputChange}
        classes={classNames('inputs__field', { 'inputs__field--error': error })}
      />
      {error && <div className="error-message">{error}</div>}
      <Button
        onClick={handleSendMessage}
        classes="inputs__field inputs__field--button"
      >
        Send
      </Button>
    </div>
  );
};
