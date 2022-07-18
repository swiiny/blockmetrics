interface IHomeCardValue {
	value: number;
	unit: string;
	hasDecimals: boolean;
}

interface IDailyChangeValue {
	symbol: string;
	value: number;
	unit: string;
	periodLabel: string;
}

export type { IDailyChangeValue, IHomeCardValue };
