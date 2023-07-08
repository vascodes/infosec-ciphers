import { caesarCipher, playfairCipher } from "./dist/ciphers.js";

const caesarPlainText = document.getElementById("caesar-plaintext");
const caesarKey = document.getElementById("caesar-key");
const btnCaesarEncrypt = document.getElementById("btn-caesar-encrypt");
const btnCaesarDecrypt = document.getElementById("btn-caesar-decrypt");
const res = document.getElementById("res");

let plainText = "",
    key = "",
    cipherText = "";

caesarPlainText.addEventListener("change", () => (plainText = caesarPlainText.value.toUpperCase()));

caesarKey.addEventListener("change", () => (key = Number(caesarKey.value)));

btnCaesarEncrypt.addEventListener("click", () => {
    console.log(plainText);
    console.log(key);

    // Caesar Cipher.    
    cipherText = caesarCipher.encrypt(plainText, key);

    res.innerHTML = "";
    res.innerHTML = `Caesar Cipher <br />`;
    res.innerHTML += `Plain Text: ${plainText} <br />`;
    res.innerHTML += `Key: ${key} <br />`;
    res.innerHTML += `Caesar Cipher Text: ${cipherText} <br />`;
});

btnCaesarDecrypt.addEventListener("click", () => {
    console.log(plainText);
    console.log(key);

    // Caesar Cipher.        
    let decryptedText = caesarCipher.decrypt(cipherText, key);

    res.innerHTML = "";
    res.innerHTML = `Caesar Cipher <br />`;
    res.innerHTML += `Caesar Cipher Text: ${cipherText} <br />`;
    res.innerHTML += `Caesar Decrypted Text: ${decryptedText} <br />`;
});

/*
const res = document.getElementById("res");

// Caesar Cipher.
// let plainText = "hello".toUpperCase();
// let key = 3;
let cipherText = caesarCipher.encrypt(plainText, key);
let decryptedText = caesarCipher.decrypt(cipherText, key);

res.innerHTML = `Caesar Cipher <br />`;
res.innerHTML += `Plain Text: ${plainText} <br />`;
res.innerHTML += `Key: ${key} <br />`;
res.innerHTML += `Caesar Cipher Text: ${cipherText} <br />`;
res.innerHTML += `Caesar Decrypted Text: ${decryptedText} <br />`;
*/

/*
// Playfair cipher.
plainText = "INSTRUMENTS";
key = "MONARCHY";
cipherText = playfairCipher.encrypt(plainText, key);
const playfairSquare = playfairCipher.playfairSquare;
decryptedText = playfairCipher.decrypt(cipherText, key);

res.innerHTML += `<br /> Playfair Cipher <br />`;
res.innerHTML += `Plain Text: ${plainText} <br />`;
res.innerHTML += `Key: ${key} <br />`;
res.innerHTML += `Playfair Square: <br />`;
playfairSquare.forEach(row => (res.innerHTML += `[${row}] <br />`));
res.innerHTML += `Playfair Cipher Text: ${cipherText} <br />`;
res.innerHTML += `Playfair Decrypted Text: ${decryptedText} <br />`;
*/
