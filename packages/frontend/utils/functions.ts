import { ETextColor } from '../styles/theme/utils/enum';

export const getRankFromScore = (score: number) => {
	const notes = ['D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];

	if (score >= 90) {
		return notes[notes.length - 1];
	}

	if (score < 10) {
		return notes[0];
	}

	// format score
	const formattedScore = (score / 100) * notes.length;

	return notes[Math.floor(formattedScore)];
};

export const getRankColor = (rank: string | undefined) => {
	const positive = ['A+', 'A', 'A-', 'B+', 'B', 'B-'];
	const negative = ['C+', 'C', 'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-', 'F+', 'F', 'F-'];

	if (!rank) {
		return ETextColor.default;
	}

	// set rank color
	let color = ETextColor.default;
	if (positive.includes(rank)) {
		color = ETextColor.positive;
	} else if (negative.includes(rank)) {
		color = ETextColor.negative;
	}

	return color;
};
