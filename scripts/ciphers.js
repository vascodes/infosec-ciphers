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
	#playfairSquareSize = 5;
	#playfairSquare = [];

	fillerChar;
	replaceMap;

	constructor(fillerChar = "X", replaceMap = { J: "I" }) {
		this.fillerChar = fillerChar;
		this.replaceMap = replaceMap;
		this.#initPlayfairSquare();
	}

	// Create a 5 x 5 empty grid (Playfair Square).
	#initPlayfairSquare() {
		for (let i = 0; i < this.#playfairSquareSize; i++) {
			this.#playfairSquare.push([]);

			for (let j = 0; j < this.#playfairSquareSize; j++) {
				this.#playfairSquare[i][j] = "";
			}
		}
	}

	#fillPlayfairSquare(key) {
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

		// Insert all characters of given key to Playfair Square.
		let strPos = 0;
		let row = 0,
			col = 0;
		while (row < this.#playfairSquareSize && strPos < newKey.length) {
			for (col = 0; col < this.#playfairSquareSize && strPos < newKey.length; col++) {
				this.#playfairSquare[row][col] = newKey[strPos];
				strPos++;
			}

			row++;
		}

		// To ensure that last row is not filled partially.
		if (col < this.#playfairSquareSize && this.#playfairSquare[row - 1][col] === "") {
			row--;
		}

		// ASCII code of uppercase Engilsh alphabets range from 65 to 90.
		let charCode = 65;

		// Insert other alphabets into Playfair Square.
		while (row < this.#playfairSquareSize) {
			for (col = 0; col < this.#playfairSquareSize && charCode <= 90; col++) {
				// Prevent inserting replacing character (usually 'J') to the Playfair Square.
				if (charCode === replacingChar.charCodeAt(0)) charCode++;

				let char = String.fromCharCode(charCode);

				// Prevent inserting alphabets that are in the given key into the Playfair Square.
				while (keyCharSet.has(char) || char === replacingChar) {
					char = String.fromCharCode(++charCode);
				}

				// Insert other alphabets to the Playfair Square.
				if (this.#playfairSquare[row][col] === "") {
					this.#playfairSquare[row][col] = char;
					charCode++;
				}
			}
			row++;
		}

		console.log(this.#playfairSquare);
		return this.#playfairSquare;
	}

	encrypt(plainText, key) {
		this.#fillPlayfairSquare(key);
	}

	decrypt(cipherText, key) {}
}
