import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Chart, Filler, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StyledChartContainer } from './BarChart.styles';
import { IBarLineChart, IBarLineChartData } from '../../../types/charts';
import { axiosRest } from '../../../utils/variables';
import { ETextColor } from '../../../styles/theme/utils/enum';

// required to get the gradient in the charts
Chart.register(Filler, CategoryScale, LinearScale, BarElement);

const BarChart: FC<IBarLineChart> = ({
	dailyType,
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
			return Math.max(...yData) * 1.0;
		} catch {
			return 0;
		}
	}, [yData]);

	const datas = useCallback(() => {
		let ctx: CanvasRenderingContext2D | null = null;
		let gradientFill: CanvasGradient | undefined;

		try {
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
					gradientStartColor = '#6BFFA6';
					gradientEndColor = '#a6f5c6';
					break;
				case ETextColor.negative:
					gradientStartColor = '#F22C3F';
					gradientEndColor = '#f64f60';
					break;
				default: // ETextColor.default
					gradientStartColor = '#25A9DC';
					gradientEndColor = '#6AD4F3';
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

			gradientFill = ctx?.createLinearGradient(0, 0, 0, chartHeight || 150);
			gradientFill?.addColorStop(0, `${gradientStartColor /* props.theme.colors.gradientStart */}`);
			gradientFill?.addColorStop(1, `${gradientEndColor /* props.theme.colors.gradientEnd */}`);
		} catch {
			//
		}

		return {
			// type: 'bar',
			labels: xData,
			datasets: [
				{
					data: yData,
					radius: 2,
					// borderWidth: 1,
					grid: { display: false },
					// fill: true,
					// pointRadius: 0,
					// tension: 0.1,
					backgroundColor: gradientFill
					//borderColor: borderFill
					//pointBorderColor: borderFill,
					//pointBackgroundColor: borderFill,
					//pointHoverBackgroundColor: borderFill,
					//pointHoverBorderColor: borderFill
				}
			]
		};
	}, [chartHeight, xData, yData, color, chartId]);

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
		if (dailyType) {
			updateLoading(true);
			try {
				let result;

				if (chainId) {
					result = await axiosRest(`/get/blockchain/chart?type=${dailyType}&id=${chainId}`);
				} else {
					result = await axiosRest(`/get/blockchains/chart?type=${dailyType}`);
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
	}, [dailyType, chainId]);

	return loading ? (
		<StyledChartContainer chartHeight={chartHeight}>
			<div id={chartId} className='relative overflow-hidden' />
		</StyledChartContainer>
	) : (
		<StyledChartContainer chartHeight={chartHeight}>
			<div id={chartId}>
				{/* @ts-ignore */}
				<Bar options={chartOptions} data={chartReady ? datas() : null} />
			</div>
		</StyledChartContainer>
	);
};

export { BarChart };
