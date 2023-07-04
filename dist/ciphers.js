// Custom modules.
import { mod } from "./utils.js";
class CaesarCipher {
    encrypt(plainText, key) {
        const encrypted = [];
        for (let i = 0; i < plainText.length; i++) {
            let charCode = plainText.charCodeAt(i), shiftedCharCode = mod(charCode - 65 + key, 26) + 65, encryptedChar = String.fromCharCode(shiftedCharCode);
            encrypted.push(encryptedChar);
        }
        return encrypted.join("");
    }
    decrypt(cipherText, key) {
        const decrypted = [];
        for (let i = 0; i < cipherText.length; i++) {
            let charCode = cipherText.charCodeAt(i), shiftedCharCode = mod(charCode - 65 - key, 26) + 65, decryptedChar = String.fromCharCode(shiftedCharCode);
            decrypted.push(decryptedChar);
        }
        return decrypted.join("");
    }
}
class PlayfairCipher {
    constructor() {
        this._fillerChar = "X";
        this._charToReplace = "J";
        this._replacingChar = "I";
        this._size = 5;
        this._playfairSquare = [];
        this.initPlayfairSquare();
    }
    //#region Getters and Setters
    get fillerChar() {
        return this._fillerChar;
    }
    set fillerChar(x) {
        this._fillerChar = x;
    }
    get charToReplace() {
        return this._charToReplace;
    }
    set charToReplace(j) {
        this._charToReplace = j;
    }
    get replacingChar() {
        return this._replacingChar;
    }
    set replacingChar(i) {
        this._replacingChar = i;
    }
    get playfairSquare() {
        return this._playfairSquare;
    }
    //#endregion
    replaceChars(str) {
        return str.replace(this.charToReplace, this.replacingChar);
    }
    // Create a 5 x 5 empty grid (Playfair Square).
    initPlayfairSquare() {
        for (let i = 0; i < this._size; i++) {
            this._playfairSquare.push([]);
            for (let j = 0; j < this._size; j++) {
                this._playfairSquare[i][j] = "";
            }
        }
    }
    fillPlayfairSquare(key) {
        let newKey = key.toUpperCase();
        newKey = this.replaceChars(newKey); // Eg: Replace 'J' in key with 'I'.
        const keyCharSet = new Set(newKey); // Remove duplicate characters in key.
        newKey = [...keyCharSet].join("");
        // Insert all characters of given key to Playfair Square.
        let strPos = 0;
        let row = 0, col = 0;
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
        let charCode = 65; // ASCII code of uppercase Engilsh alphabets range from 65 to 90.
        // Insert other alphabets into Playfair Square.
        while (row < this._size) {
            for (col = 0; col < this._size && charCode <= 90; col++) {
                // Prevent the insertion of replacing character (usually 'J').
                if (charCode === this.charToReplace.charCodeAt(0))
                    charCode++;
                let char = String.fromCharCode(charCode);
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
    getDigraphs(plainText) {
        const digraphs = [];
        for (let i = 0; i < plainText.length; i++) {
            let firstChar = plainText[i], secondChar = plainText[i + 1] || this.fillerChar;
            // If both characters are the same, append filler character.
            if (firstChar === secondChar) {
                digraphs.push(firstChar + this.fillerChar);
            }
            else {
                digraphs.push(firstChar + secondChar);
                i++;
            }
        }
        return digraphs;
    }
    getCharPositionInPlayfairSquare(char) {
        const charPos = { row: 0, col: 0 };
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
    getDigraphSubstitute(digraph, isDecrypt = false) {
        let newFirstChar, newSecondChar;
        let firstChar = digraph[0], secondChar = digraph[1];
        // Search characters of digraph in Playfair square.
        let firstCharPos = this.getCharPositionInPlayfairSquare(firstChar);
        let secondCharPos = this.getCharPositionInPlayfairSquare(secondChar);
        let sign = isDecrypt ? -1 : 1;
        // Both characters in same column.
        if (firstCharPos.col === secondCharPos.col) {
            let col = firstCharPos.col;
            let newFirstRow, newSecondRow;
            newFirstRow = mod(firstCharPos.row + sign * 1, this._size);
            newSecondRow = mod(secondCharPos.row + sign * 1, this._size);
            newFirstChar = this._playfairSquare[newFirstRow][col];
            newSecondChar = this._playfairSquare[newSecondRow][col];
        }
        else if (firstCharPos.row === secondCharPos.row) {
            // Both characters in same row.
            let row = firstCharPos.row;
            let newFirstCol, newSecondCol;
            newFirstCol = mod(firstCharPos.col + sign * 1, this._size);
            newSecondCol = mod(secondCharPos.col + sign * 1, this._size);
            newFirstChar = this._playfairSquare[row][newFirstCol];
            newSecondChar = this._playfairSquare[row][newSecondCol];
        }
        else {
            newFirstChar = this._playfairSquare[firstCharPos.row][secondCharPos.col];
            newSecondChar = this._playfairSquare[secondCharPos.row][firstCharPos.col];
        }
        return newFirstChar + newSecondChar;
    }
    encrypt(plainText, key) {
        plainText = plainText.toUpperCase();
        plainText = this.replaceChars(plainText); // Eg: Replace 'J' with 'I'.
        plainText = plainText.replace(/[\s\d\W]+/gi, ""); // Remove non alphabetic characters in plaintext.
        const digraphs = this.getDigraphs(plainText);
        this.fillPlayfairSquare(key);
        // Encryption.
        const encryptedDigraphs = [];
        digraphs.forEach(digraph => encryptedDigraphs.push(this.getDigraphSubstitute(digraph)));
        return encryptedDigraphs.join("");
    }
    decrypt(cipherText, key) {
        const digraphs = this.getDigraphs(cipherText);
        this.fillPlayfairSquare(key);
        // Decryption.
        const decryptedDigraphs = [];
        digraphs.forEach(digraph => decryptedDigraphs.push(this.getDigraphSubstitute(digraph, true)));
        return decryptedDigraphs.join("");
    }
}
export const caesarCipher = new CaesarCipher();
export const playfairCipher = new PlayfairCipher();
