/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import './chatMessenger.scss';
import { io } from 'socket.io-client';
import classNames from 'classnames';
import { UserRole } from '../../type/roles';
import { onChatMessage, onDisconnect, onPrivateMessage, onUpdateMessage } from '../../utils/socketSetup';
import { IMessage } from '../../type/message';
import { generateUniqueId } from '../../utils/generateUniqueId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Message } from '../Message/Message';

const socket = io('http://localhost:5000');

interface Props {
  username: string;
  role: UserRole;
}

export const ChatMessenger: React.FC<Props> = ({ username, role }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recipientUsername, setRecipientUsername] = useState<string>('');

  useEffect(() => {
  
    onChatMessage((message) => {
      console.log('New chat message received:', message);
      setMessages((prevMessages) => [...prevMessages, {from: message.from, text: message.text, id: generateUniqueId()}]);
    });

    onPrivateMessage((data) => {
      console.log('New private message received:', data);
      setMessages((prevPrivateMessages) => [...prevPrivateMessages, { from: data.fromUser, text: data.message, id: generateUniqueId() }]);
    });

    onUpdateMessage((data) => {
      console.log('onUpdateMessage', data);
      const updatedMessages = messages.map((message) =>
      message.id === data.messageId ? { ...message, text: data.text } : message);

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === data.messageId ? { ...message, text: data.text } : message
    )
  );
    });

    onDisconnect(() => {
      console.log('Disconnected from server', socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
    <div>
      <div className="chat__container">
        <div className="chat__body" id="message-container">
          {messages.map((message) => (
            <React.Fragment key={message.from}>
              <Message message={message} role={role} username={username} />
            </React.Fragment>
          ))}
        </div>
        <div className="chat__footer">
         <label>Welcome: {username} </label>
          <input
            type="text"
            id="recipient-input"
            placeholder="Recipient Name"
            value={recipientUsername ?? ''}
            onChange={(e) => setRecipientUsername(e.target.value)}
            className="chat__footer__field"
          />
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={handleInputChange}
            className={classNames('chat__footer__field', { 'chat__footer__field--error': error })}
          />
          {error && <div className="error-message">{error}</div>}
          <button
            type="button"
            onClick={handleSendMessage}
            className="chat__footer__field chat__footer__field--button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
