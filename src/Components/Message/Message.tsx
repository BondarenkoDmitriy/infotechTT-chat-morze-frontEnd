import classNames from 'classnames';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faKey } from '@fortawesome/free-solid-svg-icons';
import { IMessage, TypeMessage } from '../../type/message';
import { UserRole } from '../../type/roles';
import socket from '../../utils/socketSetup';
import './message.scss';
import { DecryptSingleMessageFn } from '../../type/decryMessagefn';

interface Props {
  message: IMessage;
  username: string;
  role: UserRole;
  password: string;
  decryptSingleMessage: DecryptSingleMessageFn;
}

export const Message: React.FC<Props> = ({
  message,
  username,
  role,
  password,
  decryptSingleMessage,
}) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  const handleDecoderMessage = (inputMessage: IMessage) => {
    socket.emit('decoderMorseMessage', {
      from: username,
      text: inputMessage.text,
      messageId: message.id,
    });
  };

  const handleDecoderMessageUseKey = (inputMessage: IMessage) => {
    if (showPasswordInput) {
      if (inputPassword === password) {
        decryptSingleMessage(inputMessage);

        setInputPassword('');
        setShowPasswordInput(false);
      } else {
        alert('Password is not correct');
      }
    } else {
      setShowPasswordInput(true);
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDecoderMessageUseKey(message);
    }
  };

  return (
    <>
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
        {role === 'newby' && message.type === TypeMessage.morze && (
          <span className="message__newby__eye-icon">
            <FontAwesomeIcon
              icon={faEye}
              title="Decoder morze-text"
              onClick={() => {
                handleDecoderMessage(message);
              }}
            />
          </span>
        )}
        {password.length > 0 && message.type === TypeMessage.hesh && (
          <span className="message__key-icon">
            <FontAwesomeIcon
              icon={faKey}
              title="Key to Decoder text"
              onClick={() => {
                handleDecoderMessageUseKey(message);
              }}
            />
          </span>
        )}
      </div>
      {showPasswordInput && (
        <div className={classNames('message__password__input', {
          message__password__input__sender: message.from === username,
          message__password__input__receiver: message.from !== username,
        })}
        >
          <input
            type="password"
            className="message__password__input"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            onKeyDown={handlePasswordKeyDown}
            placeholder="Enter Password"
          />
        </div>
      )}
    </>
  );
};
