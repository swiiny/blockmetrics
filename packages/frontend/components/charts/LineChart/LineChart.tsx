import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Chart, Filler, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { StyledChartContainer } from './LineChart.styles';
import { IBarLineChart, IBarLineChartData } from '../../../types/charts';
import { axiosRest } from '../../../utils/variables';
import { ETextColor } from '../../../styles/theme/utils/enum';
import dynamic from 'next/dynamic';
import { getEngNotation } from '../../../utils/convert';

// required to get the gradient in the charts
Chart.register(Filler, PointElement, LineElement, CategoryScale, LinearScale);

const LineChart: FC<IBarLineChart> = ({
	dailyType,
	unit,
	decimals = 0,
	chainId,
	color = ETextColor.default,
	dynamicColor = false,
	reverseColor = false,
	deactivateLegend = false,
	chartHeight = 150
}) => {
	const [chartData, setChartData] = useState<IBarLineChartData[]>([]);
	const [loading, updateLoading] = useReducer((_: boolean, value: boolean) => value, false);

	const chartId = useMemo(() => `chart-container-${dailyType}-${chainId}`, [dailyType, chainId]);

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
			return Math.max(...yData) * 1.005;
		} catch {
			return 0;
		}
	}, [yData]);

	const datas = useCallback(() => {
		let ctx: CanvasRenderingContext2D | null = null;
		let borderFill: CanvasGradient | undefined;
		let gradientFill: CanvasGradient | undefined;

		try {
			let borderStartColor = '';
			let borderEndColor = '';
			let gradientStartColor = '';
			let gradientEndColor = '';

			let newColor = color;

			if (dynamicColor) {
				const lastTwoItems = yData.slice(-2);
				const lastTwoItemsDifference = lastTwoItems[1] - lastTwoItems[0];

				if (reverseColor) {
					if (lastTwoItemsDifference < 0) {
						newColor = ETextColor.positive;
					} else if (lastTwoItemsDifference > 0) {
						newColor = ETextColor.negative;
					}
				} else {
					if (lastTwoItemsDifference < 0) {
						newColor = ETextColor.negative;
					} else if (lastTwoItemsDifference > 0) {
						newColor = ETextColor.positive;
					}
				}
			}

			switch (newColor) {
				case ETextColor.positive:
					borderStartColor = '#a6f5c6';
					borderEndColor = '#6BFFA6';
					gradientStartColor = '#6BFFA630';
					gradientEndColor = '#a6f5c600';
					break;
				case ETextColor.negative:
					borderStartColor = '#f64f60';
					borderEndColor = '#F22C3F';
					gradientStartColor = '#F22C3F30';
					gradientEndColor = '#f64f6000';
					break;
				default: // ETextColor.default
					borderStartColor = '#6AD4F3';
					borderEndColor = '#25A9DC';
					gradientStartColor = '#25A9DC30';
					gradientEndColor = '#6AD4F300';
					break;
			}

			const parent = document.getElementById(`${chartId}`);
			const canvas = parent?.getElementsByTagName('canvas')[0];

			if (!canvas) {
				throw new Error('Canvas not found for ' + chartId);
			}

			ctx = canvas?.getContext('2d');

			if (!ctx) {
				throw new Error('Canvas context is null for ' + chartId);
			}

			borderFill = ctx?.createLinearGradient(chartHeight || 500, 0, 100, 0);
			borderFill?.addColorStop(1, borderStartColor);
			borderFill?.addColorStop(0, borderEndColor);

			gradientFill = ctx?.createLinearGradient(0, 0, 0, chartHeight || 150);
			gradientFill?.addColorStop(0, `${gradientStartColor /* props.theme.colors.gradientStart */}`);
			gradientFill?.addColorStop(1, `${gradientEndColor /* props.theme.colors.gradientEnd */}`);
		} catch (err) {
			// console.log('catch error color', chartId);
		}

		return {
			labels: xData,
			datasets: [
				{
					data: yData,
					radius: 2,
					borderWidth: 2,
					grid: { display: false },
					fill: true,
					pointRadius: 0,
					tension: 0.5,
					backgroundColor: gradientFill,
					borderColor: borderFill,
					pointBorderColor: borderFill,
					pointBackgroundColor: borderFill,
					pointHoverBackgroundColor: borderFill,
					pointHoverBorderColor: borderFill
				}
			]
		};
	}, [xData, yData, color, dynamicColor, chartId, chartHeight, reverseColor]);

	const chartOptions = useMemo(() => {
		const data: Chart.ChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
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
					display: !deactivateLegend, // check if we need to display the y axis
					type: 'linear',
					grid: {
						drawBorder: false,
						display: false
					},
					ticks: {
						stepSize: (maxValue - minValue) / 2,
						//stepSize: 1,
						callback(value: number) {
							const ingValue = getEngNotation(value, unit, decimals);
							return ingValue.toString;
						}
					},
					min: minValue >= 0 ? minValue : 0,
					max: maxValue >= 0 ? maxValue : 0
				}
			}
		};

		return data;
	}, [deactivateLegend, maxValue, minValue, unit, decimals]);

	const chartReady = useMemo(() => {
		if (minValue && maxValue && chartOptions) {
			return true;
		}

		return false;
	}, [minValue, maxValue, chartOptions]);

	const fetchChartData = useCallback(async () => {
		if (dailyType) {
			updateLoading(true);
			try {
				let result;

				if (chainId) {
					result = await axiosRest(`/blockchain/chart?type=${dailyType}&id=${chainId}`);
				} else {
					result = await axiosRest(`/blockchains/chart?type=${dailyType}`);
				}

				// format result in IBarLineChartData
				const formattedData: IBarLineChartData[] = result.data.map((t: any) => {
					return {
						x: new Date(t.date).toLocaleString(),
						y: t.value
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
	}, [fetchChartData]);

	return loading ? (
		<StyledChartContainer chartHeight={chartHeight}>
			<div id={chartId} className='relative overflow-hidden' />
		</StyledChartContainer>
	) : (
		<StyledChartContainer chartHeight={chartHeight}>
			<div id={chartId}>
				{/* @ts-ignore */}
				<Line options={chartOptions} data={chartReady ? datas() : null} />
			</div>
		</StyledChartContainer>
	);
};

export { LineChart };
