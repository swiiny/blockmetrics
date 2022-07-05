import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Chart, Filler, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StyledChartContainer } from './BarChart.styles';
import { IChartContainer } from './BarChart.type';
import useResponsive from '../../../hooks/useResponsive';
import { IBarLineChart, IBarLineChartData } from '../../../types/charts';
import { axiosRest } from '../../../utils/variables';
import { getDailyValueFromType } from '../../../styles/theme/utils/functions';

// required to get the gradient in the charts
Chart.register(Filler, CategoryScale, LinearScale, BarElement);

const BarChart: FC<IBarLineChart> = ({ dailyType, chainId }) => {
	const [chartData, setChartData] = useState<IBarLineChartData[]>([]);
	const [loading, updateLoading] = useReducer((_: boolean, value: boolean) => value, false);

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
			return chartData.map((t) => t.x);
		} catch {
			return [];
		}
	}, [chartData]);

	const yData = useMemo(() => {
		try {
			return chartData.map((t) => t.y);
		} catch {
			return [];
		}
	}, [chartData]);

	const minValue = useMemo(() => {
		try {
			return Math.min(...yData) * 0.99;
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
			// type: 'bar',
			labels: xData,
			datasets: [
				{
					data: yData,
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					radius: 2,
					// borderWidth: 1,
					grid: { display: false }
					// fill: true,
					// pointRadius: 0,
					// tension: 0.1,
					//backgroundColor: gradientFill,
					//borderColor: borderFill,
					//pointBorderColor: borderFill,
					//pointBackgroundColor: borderFill,
					//pointHoverBackgroundColor: borderFill,
					//pointHoverBorderColor: borderFill
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
			scales: {
				// @ts-ignore
				x: {
					display: false
				},
				y: {
					// display: false, // check if we need to display the y axis
					grid: {
						display: false
					},
					ticks: {
						stepSize: (maxValue - minValue) / 2,
						//stepSize: 1,
						callback(value: number) {
							return `${Math.floor(value)}`;
						}
					},
					min: minValue,
					max: maxValue
				}
			}
		};

		return data;
	}, [minValue, maxValue]);

	const chartReady = useMemo(() => {
		if (minValue && maxValue && chartOptions) {
			return true;
		}

		return false;
	}, [yData, minValue, maxValue, chartOptions]);

	const fetchChartData = useCallback(async () => {
		if (dailyType && chainId) {
			updateLoading(true);
			try {
				const result = await axiosRest(`/get/blockchain/chart?type=${dailyType}&id=${chainId}`);

				// format result in IBarLineChartData
				const formattedData: IBarLineChartData[] = result.data.map((t: any) => {
					return {
						x: new Date(t.date).toLocaleString(),
						y: t[getDailyValueFromType(dailyType)]
					};
				});

				setChartData(formattedData);

				updateLoading(false);
			} catch (err) {
				updateLoading(false);
				console.error('Error fetchChartData', err);
			}
		}
	}, [dailyType, chainId]);

	useEffect(() => {
		fetchChartData();
	}, [dailyType, chainId]);

	return loading ? (
		<StyledChartContainer {...chartFrames}>
			<div id='chart-container' className='relative overflow-hidden' />
		</StyledChartContainer>
	) : (
		<StyledChartContainer {...chartFrames}>
			<div id='chart-container'>
				{/* @ts-ignore */}
				<Bar options={chartOptions} data={chartReady ? datas : null} />
			</div>
		</StyledChartContainer>
	);
};

export { BarChart };
