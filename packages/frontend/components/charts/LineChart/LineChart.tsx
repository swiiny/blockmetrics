import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Chart, Filler, PointElement, LineElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { StyledChartContainer } from './LineChart.styles';
import { IBarLineChart, IBarLineChartData } from '../../../types/charts';
import { axiosRest } from '../../../utils/variables';
import { ETextColor } from '../../../styles/theme/utils/enum';
import { getEngNotation } from '../../../utils/convert';
import { DefaultTheme, useTheme } from 'styled-components';

export const getOrCreateTooltip = (chart) => {
	let tooltipEl = chart.canvas.parentNode.querySelector('div');

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.style.background = 'transparent';
		tooltipEl.style.opacity = 1;
		tooltipEl.style.pointerEvents = 'none';
		tooltipEl.style.position = 'absolute';
		tooltipEl.style.transform = 'translate(-50%, 0)';
		tooltipEl.style.transition = 'all .1s ease';

		const parentContainer = document.createElement('div');
		parentContainer.setAttribute('id', 'chart-tool-parent');
		parentContainer.style.margin = '0px';

		const dataContainer = document.createElement('div');
		dataContainer.setAttribute('id', 'data-container');

		dataContainer.style.position = 'absolute';
		dataContainer.style.left = '0px';
		dataContainer.style.width = 'auto';
		dataContainer.style.height = 'auto';
		dataContainer.style.padding = '4px 8px';
		dataContainer.style.borderRadius = '10px';
		dataContainer.style.border = '1px solid #31393E';
		dataContainer.style.boxShadow = 'box-shadow: 0px 12px 24px 0px #0000004D inset;';
		dataContainer.style.backgroundColor = '#31393E';
		dataContainer.style.zIndex = 2;

		dataContainer.style.transition = 'all 100ms ease-out';
		dataContainer.style.pointerEvents = 'none';
		dataContainer.style.opacity = 1;

		tooltipEl.appendChild(parentContainer);
		chart.canvas.parentNode.appendChild(tooltipEl);
		chart.canvas.parentNode.appendChild(dataContainer);
	}

	return tooltipEl;
};

const externalTooltipHandler =
	(chartId: string, colors: DefaultTheme['colors'], chartColor: string | number) =>
	(context: { chart: any; tooltip: any }) => {
		console.log('externalTooltipHandler called');

		// Tooltip Element
		const { chart, tooltip } = context;

		const tooltipEl = getOrCreateTooltip(chart);
		const viewContainer = document.querySelector('#' + chartId);
		const dataContainer = viewContainer?.querySelector('#data-container');

		if (!dataContainer) {
			return;
		}

		if (tooltip.opacity === 0) {
			// Hide if no tooltip
			tooltipEl.style.opacity = 0;
			dataContainer.style.opacity = 0;
			return;
		}

		dataContainer.style.opacity = 1;

		// Set Text
		if (tooltip.body) {
			const titleLines = tooltip.title || [];
			// const bodyLines = tooltip.body.map((b) => b.lines);

			const chartRoot = tooltipEl.querySelector('#chart-tool-parent');

			const c = document.createElement('canvas');
			const ctx = c.getContext('2d');

			if (!ctx) {
				return;
			}

			c.width = 1;
			c.height = 150;
			c.style.transform = 'translateY(-50%)';

			const color = colors.text[chartColor as keyof typeof colors.text];

			// add a dashed line to the canvas
			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.moveTo(0, c.height / 2);
			ctx.lineTo(1, c.height);
			ctx.strokeStyle = color;
			ctx.lineWidth = 1;
			ctx.stroke();

			dataContainer.style.marginLeft = `${tooltip.x}px`;

			const { value, unit } = getEngNotation(tooltip?.dataPoints[0]?.raw);
			const valueString = `${value} ${unit}`;

			const amountTitle = document.createElement('p');
			const a = document.createTextNode(valueString);
			amountTitle.style.color = colors.text.light;
			amountTitle.style.width = '100%';
			amountTitle.style.textAlign = 'center';
			amountTitle.style.fontWeight = 'bold';
			amountTitle.appendChild(a);

			let date = titleLines[0];

			try {
				const splitDateAndHour = date.split(' ');
				const splitDate = splitDateAndHour[0].split('/');

				const splitHour = splitDateAndHour[1].split(':');

				const day = splitDate[0];
				const month = splitDate[1] - 1;
				const year = splitDate[2];

				const hour = splitHour[0];
				const minute = splitHour[1];
				const second = splitHour[2];

				const newDate = new Date(year, month, day, hour, minute, second);

				date = newDate.toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				});
			} catch (err) {
				// fallback
			}

			const dateText = document.createElement('p');
			const d = document.createTextNode(`${date}` || '');
			dateText.style.color = colors.text.default;
			dateText.style.width = '100%';
			dateText.style.textAlign = 'center';
			dateText.style.fontWeight = '500';
			dateText.appendChild(d);

			// Remove old children
			while (chartRoot.firstChild) {
				chartRoot.firstChild.remove();
			}

			while (dataContainer.firstChild) {
				dataContainer.firstChild.remove();
			}

			// add new canvas
			chartRoot.appendChild(c);
			dataContainer?.appendChild(dateText);
			dataContainer?.appendChild(amountTitle);
		}

		const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

		// Display, position, and set styles for font
		tooltipEl.style.opacity = 1;
		tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
		tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
		tooltipEl.style.font = tooltip.options.bodyFont.string;
		tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
		dataContainer.style.top = `${positionY + tooltip.y - 1.5 * tooltip.height}px`;
	};

// required to get the gradient in the charts
Chart.register(Filler, PointElement, LineElement, CategoryScale, LinearScale, Tooltip);

const LineChart: FC<IBarLineChart> = ({
	dailyType,
	unit,
	decimals = 0,
	chainId,
	color = ETextColor.light,
	dynamicColor = false,
	reverseColor = false,
	deactivateLegend = false,
	chartHeight = 150
}) => {
	const theme = useTheme();

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
			return Math.max(...yData) * 1.01;
		} catch {
			return 0;
		}
	}, [yData]);

	const chartColor = useMemo<ETextColor>(() => {
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

		return newColor;
	}, [color, dynamicColor, reverseColor, yData]);

	const datas = useCallback(() => {
		let ctx: CanvasRenderingContext2D | null = null;
		let borderFill: CanvasGradient | undefined;
		let gradientFill: CanvasGradient | undefined;

		try {
			let borderStartColor = '';
			let borderEndColor = '';
			let gradientStartColor = '';
			let gradientEndColor = '';

			switch (chartColor) {
				case ETextColor.positive:
					borderStartColor = theme.colors.chart.positive.gradientEnd;
					borderEndColor = theme.colors.chart.positive.gradientStart;
					gradientStartColor = theme.colors.chart.positive.gradientEnd + '30';
					gradientEndColor = theme.colors.chart.positive.gradientStart + '00';
					break;
				case ETextColor.negative:
					borderStartColor = theme.colors.chart.negative.gradientEnd;
					borderEndColor = theme.colors.chart.negative.gradientStart;
					gradientStartColor = theme.colors.chart.negative.gradientEnd + '30';
					gradientEndColor = theme.colors.chart.negative.gradientStart + '00';
					break;
				default: // ETextColor.default
					borderStartColor = theme.colors.chart.default.gradientEnd;
					borderEndColor = theme.colors.chart.default.gradientStart;
					gradientStartColor = theme.colors.chart.default.gradientEnd + '30';
					gradientEndColor = theme.colors.chart.default.gradientStart + '00';
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

			borderFill = ctx?.createLinearGradient(chartHeight || 150, 0, 100, 0);
			borderFill?.addColorStop(1, borderStartColor);
			borderFill?.addColorStop(0, borderEndColor);

			gradientFill = ctx?.createLinearGradient(0, 0, 0, chartHeight || 150);
			gradientFill?.addColorStop(0, `${gradientStartColor}`);
			gradientFill?.addColorStop(1, `${gradientEndColor}`);
		} catch (err) {
			// console.log('catch error color', chartId);
		}

		return {
			labels: xData,
			datasets: [
				{
					data: yData,
					radius: 4,
					borderWidth: 2,
					grid: { display: false },
					fill: true,
					pointRadius: 0,
					tension: 0.5,
					backgroundColor: gradientFill,
					borderColor: borderFill,
					hoverPointStyle: {
						backgroundColor: borderFill,
						borderColor: borderFill,
						borderWidth: 4,
						radius: 4
					},
					pointBorderColor: borderFill,
					pointBackgroundColor: borderFill,
					pointHoverBackgroundColor: borderFill,
					pointHoverBorderColor: borderFill
				}
			]
		};
	}, [xData, yData, chartColor, chartId, chartHeight, theme]);

	const chartOptions = useMemo(() => {
		const data: Chart.ChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			animation: {}, //chartAnimation,
			interaction: {
				mode: 'nearest',
				intersect: false
			},
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
			},
			plugins: {
				legend: false,
				tooltip: {
					enabled: false,
					displayColor: false,
					external: externalTooltipHandler(chartId, theme.colors, chartColor)
				}
			}
		};

		return data;
	}, [deactivateLegend, maxValue, minValue, chartId, theme.colors, chartColor, unit, decimals]);

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
