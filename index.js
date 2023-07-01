import { CaesarCipher, PlayfairCipher } from "./scripts/ciphers.js";

const res = document.getElementById("res");

const caesarCipher = new CaesarCipher();
const playfairCipher = new PlayfairCipher();

let plainText = "hello".toUpperCase();
let key = 3;

let cipherText = caesarCipher.encrypt(plainText, key);
let decryptedText = caesarCipher.decrypt(cipherText, key);

res.innerHTML = `Plain Text: ${plainText} <br />`;
res.innerHTML += `Caesar Cipher Text: ${cipherText} <br />`;
res.innerHTML += `Caesar Decrypted Text: ${decryptedText} <br />`;

console.log("Cipher:", cipherText);
console.log("Decipher:", decryptedText);

cipherText = playfairCipher.encrypt("INSTRUMENTS", "MONARCHY");
