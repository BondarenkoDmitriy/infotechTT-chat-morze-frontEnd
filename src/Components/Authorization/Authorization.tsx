/* eslint-disable */
import React, { useState } from 'react';
import { UserRole } from '../../type/roles';
import './authorization.scss';
import { authorizeSocket } from '../../utils/socketSetup';
import { Button } from '../../Controls/Button/Button';
import { Input } from '../../Controls/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Porps {
  onLogin: (username: string, role: UserRole, password: string) => void;
}

export const Authorization: React.FC<Porps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.User);
  const [encryptMessages, setEncryptMessages] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState<string>('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      onLogin(username, role, password);
      authorizeSocket(username, role);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setVisiblePassword(value);
  };

  return (
    <div className="authorization">
      <Input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        classes="authorization__field authorization__field__input"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className="authorization__field"
      >
        <option value={UserRole.User}>User</option>
        <option value={UserRole.Admin}>Admin</option>
        <option value={UserRole.Newby}>Newby</option>
      </select>
      <label>
          <input
            type="checkbox"
            checked={encryptMessages}
            onChange={(e) => setEncryptMessages(e.target.checked)}
          />
          <span>Encrypt messages</span>
        </label>
        {encryptMessages && (
          <div className="authorization__field__password">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Password"
          value={visiblePassword}
          onChange={handlePasswordChange}
          classes="authorization__field authorization__field__input"
        />
          <span
            className="authorization__field__password-icon"
            onClick={handleTogglePassword}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
            />
          </span>
        </div>
      )}
      <Button
        onClick={handleLogin}
        classes="authorization__field"
      >
        Login
      </Button>
    </div>
  );
};