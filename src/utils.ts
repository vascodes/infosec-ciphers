export function mod(a: number, b: number) : number {
	return a >= 0 ? a % b : b - (Math.abs(a) % b);
}