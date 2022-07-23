import { IEngineeringNotation } from '../types/maths';

// convert value to Engineering notation
export const getEngNotation = (value: number, unit?: string): IEngineeringNotation => {
	let newValue: number = value;
	let newUnit: string | undefined;
	let newIngValue: string | undefined;
	let hasDecimals: boolean = false;

	if (value >= 10 ** 15) {
		newValue = value / 10 ** 15;
		newIngValue = 'P';
	} else if (value >= 10 ** 12) {
		newValue = value / 10 ** 12;
		newIngValue = 'T';
	} else if (value >= 10 ** 9) {
		newValue = value / 10 ** 9;
		newIngValue = 'G';
	} else if (value >= 10 ** 6) {
		newValue = value / 10 ** 6;
		newIngValue = 'M';
	} else if (value >= 10 ** 3) {
		newValue = value / 10 ** 3;
		newIngValue = 'k';
	}

	if (newIngValue) {
		// round to 2 decimal places
		newValue = Math.round(newValue * 100) / 100;
		hasDecimals = true;
	}

	// add unit if needed
	if (unit) {
		newUnit = ` ${newIngValue || ''}${unit}`;
	} else if (newIngValue) {
		newUnit = ` ${newIngValue}`;
	}

	return {
		value: newValue,
		numberValue: newValue,
		unit: newUnit,
		hasDecimals: hasDecimals
	};
};
