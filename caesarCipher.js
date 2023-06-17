let plainText = "HELLO";
let key = 3;

function encrypt(plainText, key) {
	const encrypted = [];

	for (let i in plainText) {
		let charCode = plainText.charCodeAt(i),
			shiftedCharCode = ((charCode + key - 65) % 26) + 65,
			encryptedChar = String.fromCharCode(shiftedCharCode);

		encrypted.push(encryptedChar);
	}

	return encrypted.join("");
}

function decrypt(cipherText, key) {
	const decrypted = [];

	for (let i in cipherText) {
		let charCode = cipherText.charCodeAt(i),
			shiftedCharCode = ((charCode - key - 65) % 26) + 65,
			decryptedChar = String.fromCharCode(shiftedCharCode);

		decrypted.push(decryptedChar);
	}

	return decrypted.join("");
}

let cipherText = encrypt(plainText, key);
let decryptedText = decrypt(cipherText, key);

console.log(cipherText);
console.log(decryptedText);
