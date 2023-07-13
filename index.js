import { caesarCipher } from "./dist/ciphers.js";

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