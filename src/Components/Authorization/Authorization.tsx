/* eslint-disable */
import React from 'react';
import { UserRole } from '../../type/roles';
import './authorization.scss';

export const Authorization: React.FC = () => {
  return (
    <div className="authorization">
      <input
        type="text"
        placeholder="Your Name"
        className="authorization__field authorization__field__name"
        required
      />
      <select
        className="authorization__field"
      >
        <option value={UserRole.User}>User</option>
        <option value={UserRole.Admin}>Admin</option>
        <option value={UserRole.Newby}>Newby</option>
      </select>
      <button
        type="submit"
        className="authorization__field"
      >
        Login
      </button>
    </div>
  );
};