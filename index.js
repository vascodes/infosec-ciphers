import { caesarCipher } from "./scripts/ciphers.js";

let plainText = "hello".toUpperCase();
let key = 3;

const cipherText = caesarCipher.encrypt(plainText, key);
const decryptedText = caesarCipher.decrypt(cipherText, key);

console.log("Cipher:", cipherText);
console.log("Decipher:", decryptedText);