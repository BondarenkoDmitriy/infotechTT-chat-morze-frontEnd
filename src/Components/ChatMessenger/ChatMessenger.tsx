import React from 'react';
import { UserRole } from '../../type/roles';

interface Props {
  username: string;
  role: UserRole;
}

export const ChatMessenger: React.FC<Props> = () => {
  return (
    <div>
      Hello world
    </div>
  );
};
