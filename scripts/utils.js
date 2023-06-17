export function mod(a, b) {
	return a >= 0 ? a % b : b - (-a % b);
}