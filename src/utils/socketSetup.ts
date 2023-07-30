/* eslint-disable */
import { io, Socket } from 'socket.io-client';
import { UserRole } from '../type/roles';

const socket: Socket = io('http://localhost:5000');

export default socket;

// Функция для авторизации на сервере
export const authorizeSocket = (username: string, role: UserRole) => {
  socket.emit('authorize', { username, role });
};

// Функция для отправки сообщения чата
export const sendChatMessage = (from: string, text: string) => {
  socket.emit('chat message', { from, text });
};

// Функция для отправки личного сообщения
export const sendPrivateMessage = (toUser: string, fromUser: string, text: string) => {
  socket.emit('privateMessage', { toUser, fromUser, text });
};

// Функция для обработки события нового сообщения в чате
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

// Функция для обработки события нового личного сообщения
export const onPrivateMessage = (callback: (data: { fromUser: string; toUser:string; message: string }) => void) => {
  socket.on('privateMessage', (data:  { fromUser: string; toUser:string; message: string }) => {
    callback(data);
  });
};

//если пользователь не найден
export const onUserNotFound = (callback: (message: { from: string; text: string }) => void) => {
    socket.on('userNotFound', (message: { from: string; text: string }) => {
        callback(message);
    });
};

// Обработка события дисконнекта
export const onDisconnect = (callback: () => void) => {
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      callback();
    });
 }