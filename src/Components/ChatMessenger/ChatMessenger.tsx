/* eslint-disable object-shorthand */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import './chatMessenger.scss';
import { io } from 'socket.io-client';
import { UserRole } from '../../type/roles';
import {
  onChatMessage, onDisconnect, onPrivateMessage, onUpdateMessage,
} from '../../utils/socketSetup';
import { IMessage } from '../../type/message';
import { generateUniqueId } from '../../utils/generateUniqueId';
import { Message } from '../Message/Message';
import { InputsList } from '../InputsList/InputsList';

const socket = io('http://localhost:5000');

interface Props {
  username: string;
  role: UserRole;
}

export const ChatMessenger: React.FC<Props> = ({ username, role }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    onChatMessage((message) => {
      console.log('New chat message received:', message);

      setMessages((prevMessages) => [
        ...prevMessages,
        { from: message.from, text: message.text, id: generateUniqueId() },
      ]);
    });

    onPrivateMessage((data) => {
      console.log('New private message received:', data);
      setMessages((prevPrivateMessages) => [
        ...prevPrivateMessages,
        { from: data.fromUser, text: data.message, id: generateUniqueId() },
      ]);
    });

    onUpdateMessage((data) => {
      console.log('onUpdateMessage', data);

      setMessages((prevMessages) => prevMessages.map((message) => (
        message.id === data.messageId ? { ...message, text: data.text } : message)));
    });

    onDisconnect(() => {
      console.log('Disconnected from server', socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
        <InputsList username={username} />
      </div>
    </div>
  );
};
