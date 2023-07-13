import { playfairCipher } from "./dist/ciphers.js";

const playfairPlainText = document.getElementById("playfair-plaintext"),
    playfairCipherText = document.getElementById("playfair-ciphertext"),
    playfairEncryptKey = document.getElementById("playfair-encrypt-key"),
    playfairDecryptKey = document.getElementById("playfair-decrypt-key"),
    btnPlayfairEncrypt = document.getElementById("btn-playfair-encrypt"),
    btnPlayfairDecrypt = document.getElementById("btn-playfair-decrypt"),
    resultSection = document.getElementById("section-result"),
    resultTitle = document.getElementById("result-title"),
    result = document.getElementById("result");

resultSection.style.display = "none";

btnPlayfairEncrypt.addEventListener("click", () => {
    let plainText = playfairPlainText.value.toUpperCase().replaceAll(" ", ""),
        key = playfairEncryptKey.value;

    const playfairSquare = playfairCipher.playfairSquare;
    let cipherText = playfairCipher.encrypt(plainText, key);

    resultSection.style.display = "block";
    resultTitle.textContent = "Your Ciphertext:";
    result.innerHTML = cipherText;
});

btnPlayfairDecrypt.addEventListener("click", () => {
    let cipherText = playfairCipherText.value.toUpperCase().replaceAll(" ", ""),
        key = playfairDecryptKey.value;

    let decryptedText = playfairCipher.decrypt(cipherText, key);

    resultSection.style.display = "block";
    resultTitle.textContent = "Your Plaintext:";
    result.innerHTML = decryptedText;
});