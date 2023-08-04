import React, { useEffect, useState } from 'react';
import './adminPanel.scss';
import { User } from '../../type/user';
import { UserWithSocet } from '../../type/userWithSocet';
import { allUsers, getAllUsers } from '../../utils/socketSetup';

export const AdminPanel: React.FC = () => {
  const [authorizedUsers, setAuthorizedUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();

    allUsers((users: UserWithSocet[]) => {
      const usersList: User[] = users.map((item) => item.user);

      setAuthorizedUsers(usersList);
    });
  }, []);

  return (
    <div className="chat__container">
      <h2>Admin Panel</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {authorizedUsers.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
