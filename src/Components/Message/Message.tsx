import classNames from 'classnames';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IMessage } from '../../type/message';
import { UserRole } from '../../type/roles';
import socket from '../../utils/socketSetup';
import './message.scss';

interface Props {
  message: IMessage;
  username: string;
  role: UserRole;
}

export const Message: React.FC<Props> = ({ message, username, role }) => {
  const handleDecoderMessage = (inputMessage: IMessage) => {
    socket.emit('decoderMorseMessage', { from: username, text: inputMessage.text, messageId: inputMessage.id });
  };

  return (
    <div
      className={classNames('message', {
        message__sender: message.from === username,
        message__receiver: message.from !== username,
        message__newby: role === 'newby',
      })}
    >
      {message.from}
      :
      <br />
      {' '}
      {message.text}
      {role === 'newby' && (
        <span className="message__eye-icon">
          <FontAwesomeIcon
            icon={faEye}
            title="Показать текст"
            onClick={() => {
              handleDecoderMessage(message);
            }}
          />
        </span>
      )}
    </div>
  );
};
