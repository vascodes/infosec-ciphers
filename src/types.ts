export interface ICipher {
	encrypt(plainText: string, key: string | number): string;
	decrypt(cipherText: string, key: string | number): string;
}

export interface CharacterPosition {
	row: number;
	col: number;
}
