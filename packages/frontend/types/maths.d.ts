interface IEngineeringNotation {
	value: number;
	numberValue: number;
	unit: string | undefined;
	hasDecimals: boolean;
	toString: string;
	fullToString: string;
}

export type { IEngineeringNotation };
