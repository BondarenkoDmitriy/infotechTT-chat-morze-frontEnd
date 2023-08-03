/* eslint-disable object-shorthand */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import './chatMessenger.scss';
import { io } from 'socket.io-client';
import { UserRole } from '../../type/roles';
import {
  onChatMessage, onDisconnect, onPrivateMessage, onUpdateMessage,
} from '../../utils/socketSetup';
import { IMessage, TypeMessage } from '../../type/message';
import { generateUniqueId } from '../../utils/generateUniqueId';
import { Message } from '../Message/Message';
import { InputsList } from '../InputsList/InputsList';
import { decryptMessage, encryptMessage } from '../../utils/cryptMessage';

const socket = io('http://localhost:5000');

interface Props {
  username: string;
  role: UserRole;
  password: string;
}

export const ChatMessenger: React.FC<Props> = ({ username, role, password }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  console.log(password);

  useEffect(() => {
    onChatMessage((message) => {
      console.log('New chat message received:', message);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          from: message.from,
          text: message.text,
          id: generateUniqueId(),
          type: TypeMessage.morze,
        },
      ]);
    });

    onPrivateMessage((data) => {
      console.log('New private message received:', data);
      setMessages((prevPrivateMessages) => [
        ...prevPrivateMessages,
        {
          from: data.fromUser,
          text: password.length > 0 ? encryptMessage(data.message, password) : data.message,
          id: generateUniqueId(),
          type: password.length > 0 ? TypeMessage.hesh : TypeMessage.morze,
        },
      ]);
    });

    onUpdateMessage((data) => {
      console.log('onUpdateMessage', data);

      setMessages((prevMessages) => prevMessages.map((message) => (
        message.id === data.messageId ? {
          ...message,
          text: data.text,
          type: TypeMessage.words,
        } : message)));
    });

    onDisconnect(() => {
      console.log('Disconnected from server', socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const decryptSingleMessage = (data: IMessage) => {
    console.log(data, '--------------------');
    const text = decryptMessage(data.text, password);

    console.log(text);

    setMessages((prevMessages) => prevMessages.map((message) => (
      message.id === data.id ? {
        ...message,
        text: decryptMessage(data.text, password),
        type: TypeMessage.morze,
      } : message)));
  };

  return (
    <div>
      <div className="chat__container">
        <div className="chat__body" id="message-container">
          {messages.map((message) => (
            <React.Fragment key={message.from}>
              <Message
                message={message}
                role={role}
                username={username}
                password={password}
                decryptSingleMessage={decryptSingleMessage}
              />
            </React.Fragment>
          ))}
        </div>
        <InputsList username={username} />
      </div>
    </div>
  );
};
