/* eslint-disable */
import { io, Socket } from 'socket.io-client';
import { UserRole } from '../type/roles';
import { UserWithSocet } from '../type/userWithSocet';

const socket: Socket = io('http://localhost:5000');

export default socket;

// Функція для авторизації на сервері
export const authorizeSocket = (username: string, role: UserRole) => {
  socket.emit('authorize', { username, role });
};

// Функція для надсилання повідомлення чату
export const sendChatMessage = (from: string, text: string) => {
  socket.emit('chat message', { from, text });
};

// Функція для надсилання особистого повідомлення
export const sendPrivateMessage = (toUser: string, fromUser: string, text: string) => {
  socket.emit('privateMessage', { toUser, fromUser, text });
};

// Функція обробки події нового повідомлення в чаті
export const onChatMessage = (callback: (message: { from: string; text: string }) => void) => {
  socket.on('chat message', (message: { from: string; text: string }) => {
    callback(message);
  });
};

export const onUpdateMessage = (callback: (message: { messageId: string, text: string }) => void) => {
  socket.on('updateMessage', (message: { messageId: string; text: string }) => {
    callback(message);
  });
};

// Функція обробки події нового особистого повідомлення
export const onPrivateMessage = (callback: (data: { fromUser: string; toUser:string; message: string }) => void) => {
  socket.on('privateMessage', (data:  { fromUser: string; toUser:string; message: string }) => {
    callback(data);
  });
};

// Якщо користувач не знайдено
export const onUserNotFound = (callback: (message: { from: string; text: string }) => void) => {
    socket.on('userNotFound', (message: { from: string; text: string }) => {
        callback(message);
    });
};

// Отримати всіх користувачів
export const getAllUsers = () => {
  socket.emit('getAllUsers');
};
export const allUsers = (callback: (users: UserWithSocet[]) => void) => {
  socket.on('allUsers', (users: UserWithSocet[]) => {
    console.log('allUsers', users);
      callback(users);
  });
}

// Обробка події дисконнекта
export const onDisconnect = (callback: () => void) => {
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      callback();
    });
 }