import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-very-secure-key';

export function encryptObject(obj: Record<string, unknown>): string {
  const plaintext = JSON.stringify(obj);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, SECRET_KEY).toString();
  return ciphertext;
}

export function decryptObject(ciphertext: string): any {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
}
