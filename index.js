import { caesarCipher, playfairCipher } from "./dist/ciphers.js";

const caesarPlainText = document.getElementById("caesar-plaintext"),
    caesarCipherText = document.getElementById("caesar-ciphertext"),
    caesarEncryptKey = document.getElementById("caesar-encrypt-key"),
    caesarDecryptKey = document.getElementById("caesar-decrypt-key"),
    btnCaesarEncrypt = document.getElementById("btn-caesar-encrypt"),
    btnCaesarDecrypt = document.getElementById("btn-caesar-decrypt"),
    resultSection = document.getElementById("section-result"),
    resultTitle = document.getElementById("result-title"),
    result = document.getElementById("result");

resultSection.style.display = "none";

btnCaesarEncrypt.addEventListener("click", () => {
    let plainText = caesarPlainText.value.toUpperCase().replaceAll(" ", ""),
        key = Number(caesarEncryptKey.value);

    let cipherText = caesarCipher.encrypt(plainText, key);

    resultSection.style.display = "block";
    resultTitle.textContent = "Your Ciphertext:";
    result.innerHTML = cipherText;
});

btnCaesarDecrypt.addEventListener("click", () => {
    let cipherText = caesarCipherText.value.toUpperCase().replaceAll(" ", ""),
        key = Number(caesarDecryptKey.value);

    let decryptedText = caesarCipher.decrypt(cipherText, key);

    resultSection.style.display = "block";
    resultTitle.textContent = "Your Plaintext:";
    result.innerHTML = decryptedText;
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
