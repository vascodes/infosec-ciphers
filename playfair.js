import { playfairCipher } from "./dist/ciphers.js";

const playfairPlainText = document.getElementById("playfair-plaintext"),
    playfairCipherText = document.getElementById("playfair-ciphertext"),
    playfairEncryptKey = document.getElementById("playfair-encrypt-key"),
    playfairDecryptKey = document.getElementById("playfair-decrypt-key"),
    btnPlayfairEncrypt = document.getElementById("btn-playfair-encrypt"),
    btnPlayfairDecrypt = document.getElementById("btn-playfair-decrypt"),
    playfairSquareEncryptionSection = document.getElementById("section-playfair-square-encryption"),
    playfairSquareDecryptionSection = document.getElementById("section-playfair-square-decryption"),
    playfairSquareEncryptionContainer = document.getElementById("playfair-square-encryption-container"),
    playfairSquareDecryptionContainer = document.getElementById("playfair-square-decryption-container"),
    resultSection = document.getElementById("section-result"),
    resultTitle = document.getElementById("result-title"),
    result = document.getElementById("result");

resultSection.style.display = "none";
playfairSquareEncryptionSection.style.display = "none";
playfairSquareDecryptionSection.style.display = "none";

btnPlayfairEncrypt.addEventListener("click", () => {
    let plainText = playfairPlainText.value.toUpperCase().replaceAll(" ", ""),
        key = playfairEncryptKey.value;

    const playfairSquare = playfairCipher.playfairSquare;
    let cipherText = playfairCipher.encrypt(plainText, key);
    
    playfairSquare.forEach(row => (res.innerHTML += `[${row}] <br />`));
        
    let playfairSquareHTML = "";    
    for (let i = 0; i < playfairSquare.length; i++) {
        playfairSquareHTML += '<div class="row gx-1 justify-content-center">';

        for (let j = 0; j < playfairSquare.length; j++) {
            playfairSquareHTML += '<div class="col border border-warning-subtle m-1 py-4">';
            playfairSquareHTML += playfairSquare[i][j];
            playfairSquareHTML += '</div>';
        }

        playfairSquareHTML += '</div>';
    }
    
    playfairSquareEncryptionContainer.innerHTML = playfairSquareHTML;
    playfairSquareEncryptionSection.style.display = "block";

    resultSection.style.display = "block";
    resultTitle.textContent = "Your Ciphertext:";
    result.innerHTML = cipherText;
});

btnPlayfairDecrypt.addEventListener("click", () => {
    let cipherText = playfairCipherText.value.toUpperCase().replaceAll(" ", ""),
        key = playfairDecryptKey.value;

    let decryptedText = playfairCipher.decrypt(cipherText, key);

    const playfairSquare = playfairCipher.playfairSquare;

    let playfairSquareHTML = "";
    for (let i = 0; i < playfairSquare.length; i++) {
        playfairSquareHTML += '<div class="row gx-1 justify-content-center">';

        for (let j = 0; j < playfairSquare.length; j++) {
            playfairSquareHTML += '<div class="col border border-warning-subtle m-1 py-4">';
            playfairSquareHTML += playfairSquare[i][j];
            playfairSquareHTML += '</div>';
        }

        playfairSquareHTML += '</div>';
    }

    playfairSquareDecryptionContainer.innerHTML = playfairSquareHTML;
    playfairSquareDecryptionSection.style.display = "block";

    resultSection.style.display = "block";
    resultTitle.textContent = "Your Plaintext:";
    result.innerHTML = decryptedText;
});
