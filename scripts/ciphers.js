import { mod } from "./utils.js";

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

class PlayfairCipher {
	#keyTableSize = 5;
	#keyTable = [];

	// Create a 5 x 5 empty grid (key table).
	#initKeyTable() {
		for (let i = 0; i < this.#keyTableSize; i++) {
			this.#keyTable.push([]);

			for (let j = 0; j < this.#keyTableSize; j++) {
				this.#keyTable[i][j] = "";
			}
		}
	}

	constructor() {
		this.#initKeyTable();
	}

	#fillKeyTable(key) {
		key = key.toUpperCase();

		const keyCharSet = new Set(key);

		// Insert all characters of given key to keyTable.
		let row = 0,
			col = 0;
		let strPos = 0;

		while (row < this.#keyTableSize && strPos < key.length) {
			for (col = 0; col < this.#keyTableSize && strPos < key.length; col++) {
				this.#keyTable[row][col] = key[strPos];
				strPos++;
			}

			row++;
		}

		// To ensure that last row is not filled partially.
		if (col < this.#keyTableSize && this.#keyTable[row - 1][col] === "") {
			row--;
		}

		// Insert other alphabets into key table.
		// ASCII code of uppercase Engilsh alphabets range from 65 to 90.
		let charCode = 65;
		while (row < this.#keyTableSize) {
			for (col = 0; col < this.#keyTableSize && charCode <= 90; col++) {
				// Prevent inserting 'J' (ASCII code 74) to the key table.
				if (charCode === 74) charCode++;

				let char = String.fromCharCode(charCode);

				// Prevent inserting alphabets that are in the given key into the key table.
				while (keyCharSet.has(char)) {
					char = String.fromCharCode(++charCode);
				}

				// Insert other alphabets to the key table.
				if (this.#keyTable[row][col] === "") {
					this.#keyTable[row][col] = char;
					charCode++;
				}
			}
			row++;
		}

		console.log(this.#keyTable);
		return this.#keyTable;
	}

	encrypt(plainText, key) {
		this.#fillKeyTable(key);
	}

	decrypt(cipherText, key) {}
}

export const caesarCipher = new CaesarCipher();
export const playfairCipher = new PlayfairCipher();
