import React from 'react';
import { UserRole } from '../../type/roles';
import './chatMessenger.scss';

interface Props {
  username: string;
  role: UserRole;
}

export const ChatMessenger: React.FC<Props> = ({ username }) => {
  return (
    <div>
      <div className="chat__container">
        <div className="chat__body" id="message-container">
          <div
            className="chat__body__message"
          >
          </div>
        </div>
        <div className="chat__footer">
          <label htmlFor="recipient-input">
            {`Welcome: ${username}`}
          </label>
          <input
            type="text"
            id="recipient-input"
            placeholder="Recipient Name"
            className="chat__footer__field"
          />
          <input
            type="text"
            placeholder="Type your message..."
            className="chat__footer__field"
          />
          <button
            type="button"
            className="chat__footer__field chat__footer__field--button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
