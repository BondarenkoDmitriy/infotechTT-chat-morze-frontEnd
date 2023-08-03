import { AES, enc } from 'crypto-js';

export const encryptMessage = (message: string, password: string): string => {
  return AES.encrypt(message, password).toString();
};

export const decryptMessage = (encryptedMessage: string, password: string): string => {
  return AES.decrypt(encryptedMessage, password).toString(enc.Utf8);
};
