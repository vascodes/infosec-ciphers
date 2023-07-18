import { playfairCipher } from "./dist/ciphers.js";

const playfairPlainText = document.getElementById("playfair-plaintext"),
	playfairCipherText = document.getElementById("playfair-ciphertext"),
	playfairEncryptKey = document.getElementById("playfair-encrypt-key"),
	playfairDecryptKey = document.getElementById("playfair-decrypt-key"),
	btnPlayfairEncrypt = document.getElementById("btn-playfair-encrypt"),
	btnPlayfairDecrypt = document.getElementById("btn-playfair-decrypt"),
	playfairSquareEncryptionSection = document.getElementById("section-playfair-square-encryption"),
	playfairSquareDecryptionSection = document.getElementById("section-playfair-square-decryption"),
	playfairSquareEncryptionContainer = document.getElementById(
		"playfair-square-encryption-container",
	),
	playfairSquareDecryptionContainer = document.getElementById(
		"playfair-square-decryption-container",
	),
	playfairEncryptFiller = document.getElementById("playfair-encrypt-filler"),
	playfairDecryptFiller = document.getElementById("playfair-decrypt-filler"),
	playfairEncryptReplaceChar = document.getElementById("playfair-encrypt-replace-char"),
	playfairDecryptReplaceChar = document.getElementById("playfair-decrypt-replace-char"),
	playfairEncryptReplacingChar = document.getElementById("playfair-encrypt-replacing-char"),
	playfairDecryptReplacingChar = document.getElementById("playfair-decrypt-replacing-char"),
	resultSection = document.getElementById("section-result"),
	resultTitle = document.getElementById("result-title"),
	result = document.getElementById("result");

resultSection.style.display = "none";
playfairSquareEncryptionSection.style.display = "none";
playfairSquareDecryptionSection.style.display = "none";

let encryptFiller = playfairCipher.fillerChar,
	decryptFiller = playfairCipher.fillerChar;
let encryptReplaceChar = playfairCipher.charToReplace,
	encryptReplacingChar = playfairCipher.replacingChar;
let decryptReplaceChar = playfairCipher.charToReplace,
	decryptReplacingChar = playfairCipher.replacingChar;

playfairEncryptFiller.addEventListener("change", () => {
	encryptFiller = playfairEncryptFiller.value;
});

playfairDecryptFiller.addEventListener("change", () => {
	decryptFiller = playfairDecryptFiller.value;
});

playfairEncryptReplaceChar.addEventListener("change", () => {
	encryptReplaceChar = playfairEncryptReplaceChar.value;
});

playfairDecryptReplaceChar.addEventListener("change", () => {
	decryptReplaceChar = playfairDecryptReplaceChar.value;
});

playfairEncryptReplacingChar.addEventListener("change", () => {
	encryptReplacingChar = playfairEncryptReplacingChar.value;
});

playfairDecryptReplacingChar.addEventListener("change", () => {
	decryptReplacingChar = playfairDecryptReplacingChar.value;
});

// Generate alphabet dropdown options for playfair encrypt & decrypt filler select element.
for (let i = 65; i <= 90; i++) {
	let alphabet = String.fromCharCode(i);
	let option = document.createElement("option");

	option.text = alphabet;
	option.value = alphabet;

	if (alphabet === encryptFiller) option.setAttribute("selected", true);

	playfairEncryptFiller.add(option);

	let decryptOption = option.cloneNode(true);
	playfairDecryptFiller.add(decryptOption);
}

// Generate alphabet dropdown options for replaceChar and replacingChar select elements.
for (let i = 65; i <= 90; i++) {
	let alphabet = String.fromCharCode(i);
	let option = document.createElement("option");

	option.text = alphabet;
	option.value = alphabet;

	if (alphabet === encryptReplaceChar) option.setAttribute("selected", true);

	playfairEncryptReplaceChar.add(option);
	playfairDecryptReplaceChar.add(option.cloneNode(true));

	let replacingCharOption = document.createElement("option");
	replacingCharOption.text = alphabet;
	replacingCharOption.value = alphabet;

	if (alphabet === encryptReplacingChar) replacingCharOption.setAttribute("selected", true);

	playfairEncryptReplacingChar.add(replacingCharOption);
	playfairDecryptReplacingChar.add(replacingCharOption.cloneNode(true));
}

btnPlayfairEncrypt.addEventListener("click", () => {
	let plainText = playfairPlainText.value.toUpperCase().replaceAll(" ", ""),
		key = playfairEncryptKey.value;

	playfairCipher.fillerChar = encryptFiller;
	playfairCipher.charToReplace = encryptReplaceChar;
	playfairCipher.replacingChar = encryptReplacingChar;

	const playfairSquare = playfairCipher.playfairSquare;
	let cipherText = playfairCipher.encrypt(plainText, key);

	let playfairSquareHTML = "";
	for (let i = 0; i < playfairSquare.length; i++) {
		playfairSquareHTML += '<div class="row gx-1 justify-content-center">';

		for (let j = 0; j < playfairSquare.length; j++) {
			playfairSquareHTML += '<div class="col border border-warning-subtle m-1 py-4">';
			playfairSquareHTML += playfairSquare[i][j];
			playfairSquareHTML += "</div>";
		}

		playfairSquareHTML += "</div>";
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
			playfairSquareHTML += "</div>";
		}

		playfairSquareHTML += "</div>";
	}

	playfairSquareDecryptionContainer.innerHTML = playfairSquareHTML;
	playfairSquareDecryptionSection.style.display = "block";

	resultSection.style.display = "block";
	resultTitle.textContent = "Your Plaintext:";
	result.innerHTML = decryptedText;
});
