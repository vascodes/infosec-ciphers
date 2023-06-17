function mod(a, b) {
	return a >= 0 ? a % b : b - (-a % b);
}

class CaesarCipher {
	encrypt(plainText, key) {
		const encrypted = [];

		for (let i in plainText) {
			let charCode = plainText.charCodeAt(i),
				shiftedCharCode = mod(charCode - 65 + key, 26) + 65,
				encryptedChar = String.fromCharCode(shiftedCharCode);

			encrypted.push(encryptedChar);
		}

		return encrypted.join("");
	}

	decrypt(cipherText, key) {
		const decrypted = [];

		for (let i in cipherText) {
			let charCode = cipherText.charCodeAt(i),
				shiftedCharCode = mod(charCode - 65 - key, 26) + 65,
				decryptedChar = String.fromCharCode(shiftedCharCode);

			decrypted.push(decryptedChar);
		}

		return decrypted.join("");
	}
}

let plainText = "hello".toUpperCase();
let key = 3;

const cs = new CaesarCipher();
const cipherText = cs.encrypt(plainText, key);
const decryptedText = cs.decrypt(cipherText, key);

console.log("Cipher:", cipherText);
console.log("Decipher:", decryptedText);
