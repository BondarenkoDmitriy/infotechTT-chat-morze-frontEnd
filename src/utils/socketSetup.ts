/* eslint-disable */
import { io, Socket } from 'socket.io-client';
import { UserRole } from '../type/roles';

const socket: Socket = io('http://localhost:5000');

export default socket;

// Функция для авторизации на сервере
export const authorizeSocket = (username: string, role: UserRole) => {
  socket.emit('authorize', { username, role });
};

// Обработка события дисконнекта
export const onDisconnect = (callback: () => void) => {
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      callback();
    });
 }