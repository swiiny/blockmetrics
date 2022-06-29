interface IBarLineChart {
	type: EDailyData;
	chainId: TBlockchain['id'];
}

interface IBarLineChartData {
	horizontalData: number;
	verticalData: number;
}
