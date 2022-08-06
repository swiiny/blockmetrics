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
