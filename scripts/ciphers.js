import { mod } from "./utils.js";

export class CaesarCipher {
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

export class PlayfairCipher {
	#keyTableSize = 5;
	#keyTable = [];

	fillerChar;
	replaceMap;

	constructor(fillerChar = "X", replaceMap = { J: "I" }) {
		this.fillerChar = fillerChar;
		this.replaceMap = replaceMap;
		this.#initKeyTable();
	}

	// Create a 5 x 5 empty grid (key table).
	#initKeyTable() {
		for (let i = 0; i < this.#keyTableSize; i++) {
			this.#keyTable.push([]);

			for (let j = 0; j < this.#keyTableSize; j++) {
				this.#keyTable[i][j] = "";
			}
		}
	}

	#fillKeyTable(key) {
		let charToReplace = Object.keys(this.replaceMap)[0];
		let replacingChar = this.replaceMap[charToReplace];

		console.log(
			"filler: ",
			this.fillerChar,
			"\nCharacter to be replaced: ",
			charToReplace,
			"\nReplacing Char: ",
			replacingChar,
		);

		let newKey = key.toUpperCase();
		newKey = newKey.replace(charToReplace, replacingChar); // Eg: Replace 'J' in key with 'I'.
		const keyCharSet = new Set(newKey); // Remove duplicate characters in key.
		newKey = [...keyCharSet].join("");

		console.log("Key: ", newKey);

		// Insert all characters of given key to keyTable.
		let strPos = 0;
		let row = 0,
			col = 0;
		while (row < this.#keyTableSize && strPos < newKey.length) {
			for (col = 0; col < this.#keyTableSize && strPos < newKey.length; col++) {
				this.#keyTable[row][col] = newKey[strPos];
				strPos++;
			}

			row++;
		}

		// To ensure that last row is not filled partially.
		if (col < this.#keyTableSize && this.#keyTable[row - 1][col] === "") {
			row--;
		}

		// ASCII code of uppercase Engilsh alphabets range from 65 to 90.
		let charCode = 65;

		// Insert other alphabets into key table.
		while (row < this.#keyTableSize) {
			for (col = 0; col < this.#keyTableSize && charCode <= 90; col++) {
				// Prevent inserting replacing character (usually 'J') to the key table.
				if (charCode === replacingChar.charCodeAt(0)) charCode++;

				let char = String.fromCharCode(charCode);

				// Prevent inserting alphabets that are in the given key into the key table.
				while (keyCharSet.has(char) || char === replacingChar) {
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
