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
	#size = 5;
	#playfairSquare = [];

	fillerChar;
	charToReplace;
	replacingChar;

	constructor(fillerChar = "X", charToReplace = "J", replacingChar = "I") {
		this.fillerChar = fillerChar;
		this.charToReplace = charToReplace;
		this.replacingChar = replacingChar;

		this.#initPlayfairSquare();
	}

	// Create a 5 x 5 empty grid (Playfair Square).
	#initPlayfairSquare() {
		for (let i = 0; i < this.#size; i++) {
			this.#playfairSquare.push([]);

			for (let j = 0; j < this.#size; j++) {
				this.#playfairSquare[i][j] = "";
			}
		}
	}

	#replaceChars(str) {
		return str.replace(this.charToReplace, this.replacingChar);
	}

	#fillPlayfairSquare(key) {
		console.log(
			"filler: ",
			this.fillerChar,
			"\nCharacter to be replaced: ",
			this.charToReplace,
			"\nReplacing Char: ",
			this.replacingChar,
		);

		let newKey = key.toUpperCase();
		newKey = this.#replaceChars(newKey); // Eg: Replace 'J' in key with 'I'.
		const keyCharSet = new Set(newKey); // Remove duplicate characters in key.
		newKey = [...keyCharSet].join("");

		console.log("Key: ", newKey);

		// Insert all characters of given key to Playfair Square.
		let strPos = 0;
		let row = 0,
			col = 0;
		while (row < this.#size && strPos < newKey.length) {
			for (col = 0; col < this.#size && strPos < newKey.length; col++) {
				this.#playfairSquare[row][col] = newKey[strPos];
				strPos++;
			}

			row++;
		}

		// To ensure that last row is not filled partially.
		if (col < this.#size && this.#playfairSquare[row - 1][col] === "") {
			row--;
		}

		// ASCII code of uppercase Engilsh alphabets range from 65 to 90.
		let charCode = 65;

		// Insert other alphabets into Playfair Square.
		while (row < this.#size) {
			for (col = 0; col < this.#size && charCode <= 90; col++) {
				// Prevent the insertion of replacing character (usually 'J').
				if (charCode === this.charToReplace.charCodeAt(0)) charCode++;

				let char = String.fromCharCode(charCode);

				// Prevent the insertion of alphabets that are in the given key.
				while (keyCharSet.has(char) || char === this.charToReplace) {
					char = String.fromCharCode(++charCode);
				}

				// Insert other alphabets..
				if (this.#playfairSquare[row][col] === "") {
					this.#playfairSquare[row][col] = char;
					charCode++;
				}
			}
			row++;
		}

		return this.#playfairSquare;
	}

	#getDigraphs(plainText) {
		const digraphs = [];

		for (let i = 0; i < plainText.length; i++) {
			let firstChar = plainText[i],
				secondChar = plainText[i + 1] || this.fillerChar;

			// If both characters are the same, append filler character.
			if (firstChar === secondChar) {
				digraphs.push(firstChar + this.fillerChar);
			} else {
				digraphs.push(firstChar + secondChar);
				i++;
			}
		}

		return digraphs;
	}

	#getCharPositionInPlayfairSquare(char) {
		const charPos = { row: null, col: null };

		for (let row = 0; row < this.#size; row++) {
			for (let col = 0; col < this.#size; col++) {
				if (this.#playfairSquare[row][col] === char) {
					charPos.row = row;
					charPos.col = col;
					break;
				}
			}
		}

		return charPos;
	}

	#getEncryptedDigraph(digraph) {
		let firstChar = digraph[0],
			secondChar = digraph[1];

		// Search characters of digraph in Playfair square.
		let firstCharPos = this.#getCharPositionInPlayfairSquare(firstChar);
		let secondCharPos = this.#getCharPositionInPlayfairSquare(secondChar);

		let encryptedFirstChar, encryptedSecondChar;

		// Both characters in same column.
		if (firstCharPos.col === secondCharPos.col) {
			let newFirstRow, newSecondRow;
			let col = firstCharPos.col;

			newFirstRow = (firstCharPos.row + 1) % this.#size;
			newSecondRow = (secondCharPos.row + 1) % this.#size;

			encryptedFirstChar = this.#playfairSquare[newFirstRow][col];
			encryptedSecondChar = this.#playfairSquare[newSecondRow][col];
		} else if (firstCharPos.row === secondCharPos.row) {
			// Both characters in same row.

			let newFirstCol, newSecondCol;
			let row = firstCharPos.row;

			newFirstCol = (firstCharPos.col + 1) % this.#size;
			newSecondCol = (secondCharPos.col + 1) % this.#size;

			encryptedFirstChar = this.#playfairSquare[row][newFirstCol];
			encryptedSecondChar = this.#playfairSquare[row][newSecondCol];
		} else {
			encryptedFirstChar = this.#playfairSquare[firstCharPos.row][secondCharPos.col];
			encryptedSecondChar = this.#playfairSquare[secondCharPos.row][firstCharPos.col];
		}

		return encryptedFirstChar + encryptedSecondChar;
	}

	encrypt(plainText, key) {
		console.log("Original plaintext: ", plainText);

		plainText = plainText.toUpperCase();
		plainText = this.#replaceChars(plainText); // Eg: Replace 'J' with 'I'.
		plainText = plainText.replace(/[\s\d\W]+/gi, ""); // Remove non alphabetic characters in plaintext.

		const digraphs = this.#getDigraphs(plainText);
		this.#fillPlayfairSquare(key);

		// Encryption.
		const encryptedDigraphs = [];
		for (let digraph of digraphs) {
			let encryptedDigraph = this.#getEncryptedDigraph(digraph);
			encryptedDigraphs.push(encryptedDigraph);
		}

		console.log(digraphs);
		console.log(this.#playfairSquare);
		console.log(encryptedDigraphs);

		return encryptedDigraphs.join("");
	}

	decrypt(cipherText, key) {}
}
