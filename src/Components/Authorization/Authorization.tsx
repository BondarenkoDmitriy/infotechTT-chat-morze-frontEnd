/* eslint-disable */
import React, { useState } from 'react';
import { UserRole } from '../../type/roles';
import './authorization.scss';
import { authorizeSocket } from '../../utils/socketSetup';
import { Button } from '../../Controls/Button/Button';
import { Input } from '../../Controls/Input/Input';

interface Porps {
  onLogin: (username: string, role: UserRole) => void;
}

export const Authorization: React.FC<Porps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.User);

  const handleLogin = () => {
    if (username.trim() !== '') {
      onLogin(username, role);
      authorizeSocket(username, role);
    }
  };

  return (
    <div className="authorization">
      <Input
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        classes="authorization__field authorization__field__name"
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
      <Button
        onClick={handleLogin}
        classes="authorization__field"
      >
        Login
      </Button>
    </div>
  );
};