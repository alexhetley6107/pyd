import CryptoJS from 'crypto-js';
import { ENV } from '@/environments/environment';

const secretKey = ENV.SECRET_KEY;

export function encryptObject(obj: Record<string, unknown>): string {
  const plaintext = JSON.stringify(obj);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  return ciphertext;
}

export function decryptObject(ciphertext: string): any {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    if (!plaintext) {
      throw new Error('Decryption failed: result is empty');
    }

    return JSON.parse(plaintext);
  } catch (error) {
    console.error('Error decrypting object:', error);
    return null;
  }
}
