// Types.
import { CharacterPosition, ICipher } from "./types.js";

// Custom modules.
import { mod } from "./utils.js";

class CaesarCipher implements ICipher {
	encrypt(plainText: string, key: number): string {
		const encrypted: string[] = [];

		for (let i = 0; i < plainText.length; i++) {
			let charCode: number = plainText.charCodeAt(i),
				shiftedCharCode: number = mod(charCode - 65 + key, 26) + 65,//ZYJJMML
				encryptedChar: string = String.fromCharCode(shiftedCharCode);

			encrypted.push(encryptedChar);
		}

		return encrypted.join("");
	}

	decrypt(cipherText: string, key: number): string {
		const decrypted: string[] = [];

		for (let i = 0; i < cipherText.length; i++) {
			let charCode: number = cipherText.charCodeAt(i),
				shiftedCharCode: number = mod(charCode - 65 - key, 26) + 65,
				decryptedChar: string = String.fromCharCode(shiftedCharCode);

			decrypted.push(decryptedChar);
		}

		return decrypted.join("");
	}
}

class PlayfairCipher {
	private _fillerChar: string = "X";
	private _charToReplace: string = "J";
	private _replacingChar: string = "I";
	private _size: number = 5;
	private _playfairSquare: string[][] = [];

	constructor() {
		this.initPlayfairSquare();
	}

	//#region Getters and Setters
	public get fillerChar(): string {
		return this._fillerChar;
	}

	public set fillerChar(x: string) {
		this._fillerChar = x;
	}

	public get charToReplace(): string {
		return this._charToReplace;
	}

	public set charToReplace(j: string) {
		this._charToReplace = j;
	}

	public get replacingChar(): string {
		return this._replacingChar;
	}

	public set replacingChar(i: string) {
		this._replacingChar = i;
	}

	public get playfairSquare(): string[][] {
		return this._playfairSquare;
	}
	//#endregion

	private replaceChars(str: string): string {
		return str.replace(this.charToReplace, this.replacingChar);
	}

	// Create a 5 x 5 empty grid (Playfair Square).
	private initPlayfairSquare(): void {
		for (let i = 0; i < this._size; i++) {
			this._playfairSquare.push([]);

			for (let j = 0; j < this._size; j++) {
				this._playfairSquare[i][j] = "";
			}
		}
	}

	private fillPlayfairSquare(key: string): string[][] {
		let newKey: string = key.toUpperCase();
		newKey = this.replaceChars(newKey); // Eg: Replace 'J' in key with 'I'.
		const keyCharSet: Set<string> = new Set(newKey); // Remove duplicate characters in key.
		newKey = [...keyCharSet].join("");

		// Insert all characters of given key to Playfair Square.
		let strPos: number = 0;
		let row: number = 0,
			col: number = 0;
		while (row < this._size && strPos < newKey.length) {
			for (col = 0; col < this._size && strPos < newKey.length; col++) {
				this._playfairSquare[row][col] = newKey[strPos];
				strPos++;
			}

			row++;
		}

		// To ensure that last row is not filled partially.
		if (col < this._size && this._playfairSquare[row - 1][col] === "") {
			row--;
		}

		let charCode: number = 65; // ASCII code of uppercase Engilsh alphabets range from 65 to 90.

		// Insert other alphabets into Playfair Square.
		while (row < this._size) {
			for (col = 0; col < this._size && charCode <= 90; col++) {
				// Prevent the insertion of replacing character (usually 'J').
				if (charCode === this.charToReplace.charCodeAt(0)) charCode++;

				let char: string = String.fromCharCode(charCode);

				// Prevent the insertion of alphabets that are in the given key.
				while (keyCharSet.has(char) || char === this.charToReplace) {
					char = String.fromCharCode(++charCode);
				}

				// Insert other alphabets.
				if (this._playfairSquare[row][col] === "") {
					this._playfairSquare[row][col] = char;
					charCode++;
				}
			}

			row++;
		}

		return this._playfairSquare;
	}

	private getDigraphs(plainText: string): string[] {
		const digraphs: string[] = [];

		for (let i = 0; i < plainText.length; i++) {
			let firstChar: string = plainText[i],
				secondChar: string = plainText[i + 1] || this.fillerChar;

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

	private getCharPositionInPlayfairSquare(char: string): CharacterPosition {
		const charPos: CharacterPosition = { row: 0, col: 0 };

		for (let row = 0; row < this._size; row++) {
			for (let col = 0; col < this._size; col++) {
				if (this._playfairSquare[row][col] === char) {
					charPos.row = row;
					charPos.col = col;
					break;
				}
			}
		}

		return charPos;
	}

	private getDigraphSubstitute(digraph: string, isDecrypt = false): string {
		let newFirstChar: string, newSecondChar: string;
		let firstChar: string = digraph[0],
			secondChar: string = digraph[1];

		// Search characters of digraph in Playfair square.
		let firstCharPos: CharacterPosition = this.getCharPositionInPlayfairSquare(firstChar);
		let secondCharPos: CharacterPosition = this.getCharPositionInPlayfairSquare(secondChar);

		let sign: number = isDecrypt ? -1 : 1;

		// Both characters in same column.
		if (firstCharPos.col === secondCharPos.col) {
			let col: number = firstCharPos.col;
			let newFirstRow: number, newSecondRow: number;

			newFirstRow = mod(firstCharPos.row + sign * 1, this._size);
			newSecondRow = mod(secondCharPos.row + sign * 1, this._size);

			newFirstChar = this._playfairSquare[newFirstRow][col];
			newSecondChar = this._playfairSquare[newSecondRow][col];
		} else if (firstCharPos.row === secondCharPos.row) {
			// Both characters in same row.
			let row: number = firstCharPos.row;
			let newFirstCol: number, newSecondCol: number;

			newFirstCol = mod(firstCharPos.col + sign * 1, this._size);
			newSecondCol = mod(secondCharPos.col + sign * 1, this._size);

			newFirstChar = this._playfairSquare[row][newFirstCol];
			newSecondChar = this._playfairSquare[row][newSecondCol];
		} else {
			newFirstChar = this._playfairSquare[firstCharPos.row][secondCharPos.col];
			newSecondChar = this._playfairSquare[secondCharPos.row][firstCharPos.col];
		}

		return newFirstChar + newSecondChar;
	}

	encrypt(plainText: string, key: string): string {
		plainText = plainText.toUpperCase();
		plainText = this.replaceChars(plainText); // Eg: Replace 'J' with 'I'.
		plainText = plainText.replace(/[\s\d\W]+/gi, ""); // Remove non alphabetic characters in plaintext.

		const digraphs: string[] = this.getDigraphs(plainText);
		this.fillPlayfairSquare(key);

		// Encryption.
		const encryptedDigraphs: string[] = [];
		digraphs.forEach(digraph => encryptedDigraphs.push(this.getDigraphSubstitute(digraph)));

		return encryptedDigraphs.join("");
	}

	decrypt(cipherText: string, key: string): string {
		const digraphs: string[] = this.getDigraphs(cipherText);
		this.fillPlayfairSquare(key);

		// Decryption.
		const decryptedDigraphs: string[] = [];
		digraphs.forEach(digraph =>
			decryptedDigraphs.push(this.getDigraphSubstitute(digraph, true)),
		);

		return decryptedDigraphs.join("");
	}
}

export const caesarCipher = new CaesarCipher();
export const playfairCipher = new PlayfairCipher();