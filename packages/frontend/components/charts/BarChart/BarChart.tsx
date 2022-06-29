import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Chart, Filler } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StyledChartContainer } from './BarChart.styles';
import { IChartContainer } from './BarChart.type';
import useResponsive from '../../../hooks/useResponsive';

// required to get the gradient in the charts
Chart.register(Filler);

const BarChart: FC<IBarLineChart> = ({ type, chainId }) => {
	const [chartData, setChartData] = useState<IBarLineChartData[]>([]);
	const [loading, updateLoading] = useReducer((state: boolean, value: boolean) => value || !state, true);

	const { screenWidth, isSmallerThanSm, isSmallerThanMd, isSmallerThanLg } = useResponsive();

	const chartFrames: IChartContainer = useMemo(() => {
		let containerHeight = '300px';
		let chartHeight = '300px';
		let chartVerticalDelta = '0px';
		let containerMarginTop = '0px';
		let chartHeightInt = 300;

		if (isSmallerThanSm) {
			containerHeight = '120px';
			chartHeight = '120px';
			chartHeightInt = 120;
			chartVerticalDelta = '0px';
			containerMarginTop = '0px';
		} else if (isSmallerThanMd) {
			containerHeight = '250px';
			chartHeight = '250px';
			chartHeightInt = 250;
			chartVerticalDelta = '0px';
			containerMarginTop = '0px';
		} else if (isSmallerThanLg) {
			containerHeight = '250px';
			chartHeight = '250px';
			chartHeightInt = 250;
			chartVerticalDelta = '-0px';
			containerMarginTop = '0px';
		}

		return {
			containerHeight,
			containerMarginTop,
			chartHeight,
			chartHeightInt,
			chartVerticalDelta
		};
	}, [screenWidth, isSmallerThanSm, isSmallerThanMd, isSmallerThanMd, isSmallerThanLg]);

	const xData = useMemo(() => {
		try {
			return chartData.map((t) => t.horizontalData);
		} catch {
			return [];
		}
	}, [chartData]);

	const yData = useMemo(() => {
		try {
			return chartData.map((t) => t.verticalData);
		} catch {
			return [];
		}
	}, [chartData]);

	const minValue = useMemo(() => {
		try {
			return Math.min(...yData) * 1.0;
		} catch {
			return 0;
		}
	}, [yData]);

	const maxValue = useMemo(() => {
		try {
			return Math.max(...yData) * 1.0;
		} catch {
			return 0;
		}
	}, [yData]);

	const datas = useMemo(() => {
		let ctx: CanvasRenderingContext2D | null = null;
		let borderFill: CanvasGradient | undefined;
		let gradientFill: CanvasGradient | undefined;

		try {
			ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
			borderFill = ctx?.createLinearGradient(chartFrames?.chartHeightInt || 500, 0, 100, 0);
			borderFill?.addColorStop(1, '#7AD1BF');
			borderFill?.addColorStop(0, '#25B0C4');

			gradientFill = ctx?.createLinearGradient(0, 0, 0, chartFrames?.chartHeightInt || 500); // replace 500 by chart Height
			gradientFill?.addColorStop(0, `${'#25B0C4' /* props.theme.colors.gradientStart */}30`);
			gradientFill?.addColorStop(1, `${'#7AD1BF' /* props.theme.colors.gradientEnd */}00`);
		} catch {
			//
		}

		return {
			type: 'line',
			labels: xData.map((t) => new Date(t).toLocaleString('de-DE')),
			datasets: [
				{
					data: yData,
					radius: 2,
					borderWidth: 1,
					grid: { display: false },
					fill: true,
					pointRadius: 0,
					tension: 0.1,
					backgroundColor: gradientFill,
					borderColor: borderFill,
					pointBorderColor: borderFill,
					pointBackgroundColor: borderFill,
					pointHoverBackgroundColor: borderFill,
					pointHoverBorderColor: borderFill
				}
			]
		};
	}, [chartFrames?.chartHeightInt, xData, yData]);

	const chartOptions = useMemo(() => {
		const data: Chart.ChartOptions = {
			responsive: true,
			animation: {}, //chartAnimation,
			// interaction: false,
			title: {
				display: false
			},
			maintainAspectRatio: false,
			scales: {
				x: {
					grid: {
						display: false
					},
					display: false
				},
				y: {
					type: 'linear',
					display: false,
					grid: {
						display: false,
						color: '#8fd4c520'
					}
				}
			},
			plugins: {
				legend: {
					display: false
				}, // ChartLegendOptions
				tooltip: {
					enabled: false,
					displayColors: false
					//external: null
				}
			}
		};

		if (minValue >= 0 && maxValue >= 0) {
			data.scales.y.min = minValue;
			data.scales.y.max = maxValue;
		}

		return data;
	}, [minValue, maxValue]);

	const chartReady = useMemo(() => {
		if (minValue && maxValue && chartOptions) {
			return true;
		}

		return false;
	}, [yData, minValue, maxValue, chartOptions]);

	const fetchChartData = useCallback(async () => {
		if (type && chainId) {
		}
	}, [type, chainId]);

	useEffect(() => {
		fetchChartData();
	}, [type, chainId]);

	return loading ? (
		<></>
	) : (
		<StyledChartContainer {...chartFrames}>
			<div id='chart-container' className='relative overflow-hidden'>
				<Bar options={chartOptions} data={chartReady ? datas : null} />
			</div>
		</StyledChartContainer>
	);
};

export { BarChart };
