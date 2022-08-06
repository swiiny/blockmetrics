import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Chart, Filler, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { StyledChartContainer } from './BarChart.styles';
import { IBarLineChart, IBarLineChartData } from '../../../types/charts';
import { axiosRest } from '../../../utils/variables';
import { EFlex, ERequestState, ESize, ETextColor } from '../../../styles/theme/utils/enum';
import { getEngNotation } from '../../../utils/convert';
import { DefaultTheme, useTheme } from 'styled-components';
import { ITooltipChart } from './BarChart.type';
import BMSkeleton from '../../../styles/theme/components/BMSkeleton';
import Flex from '../../../styles/layout/Flex';
import BMText from '../../../styles/theme/components/BMText';

const getOrCreateTooltip = (chart: ITooltipChart) => {
	let tooltipEl = chart.canvas.parentNode.querySelector('div');

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.style.background = 'transparent';
		tooltipEl.style.opacity = '1';
		tooltipEl.style.pointerEvents = 'none';
		tooltipEl.style.position = 'absolute';
		tooltipEl.style.transform = 'translate(-50%, 0)';
		tooltipEl.style.transition = 'all 100ms ease-in-out';

		const parentContainer = document.createElement('div');
		parentContainer.setAttribute('id', 'chart-tool-parent');
		parentContainer.style.margin = '0px';

		const dataContainer = document.createElement('div');
		dataContainer.setAttribute('id', 'data-container');

		dataContainer.style.position = 'absolute';
		dataContainer.style.left = '0px';
		dataContainer.style.width = 'auto';
		dataContainer.style.height = 'auto';
		dataContainer.style.padding = '7px 12px';
		dataContainer.style.borderRadius = '10px';
		dataContainer.style.border = '1px solid #474747';
		dataContainer.style.boxShadow = '0px 12px 24px 0px #0000004D inset';
		dataContainer.style.backgroundColor = '#31393E';
		dataContainer.style.zIndex = '2';

		dataContainer.style.transition = 'all 100ms ease-out, opacity 100ms 50ms ease-out';
		dataContainer.style.pointerEvents = 'none';
		dataContainer.style.opacity = '1';

		tooltipEl.appendChild(parentContainer);
		chart.canvas.parentNode.appendChild(tooltipEl);
		chart.canvas.parentNode.appendChild(dataContainer);
	}

	return tooltipEl;
};

const externalTooltipHandler =
	(chartId: string, colors: DefaultTheme['colors'], chartColor: string | number) =>
	(context: { chart: any; tooltip: any }) => {
		// Tooltip Element
		const { chart, tooltip } = context;

		const tooltipEl = getOrCreateTooltip(chart);
		const viewContainer = document.querySelector('#' + chartId);
		const dataContainer = viewContainer?.querySelector('#data-container') as HTMLElement;

		if (!dataContainer) {
			return;
		}

		// Hide if no tooltip
		if (tooltip.opacity === 0) {
			tooltipEl.style.opacity = 0;
			dataContainer.style.opacity = '0';
			return;
		}

		dataContainer.style.opacity = '1';

		// Set Text
		if (tooltip.body) {
			const titleLines = tooltip.title || [];
			// const bodyLines = tooltip.body.map((b) => b.lines);

			const chartRoot = tooltipEl.querySelector('#chart-tool-parent');

			const c = document.createElement('canvas');

			c.width = 1;
			c.height = 200;
			c.style.transform = 'translateY(-50%)';

			dataContainer.style.marginLeft = `${tooltip.x}px`;

			const { toString } = getEngNotation(tooltip?.dataPoints[0]?.raw) ?? { toString: '-' };

			const color = colors.text[chartColor as keyof typeof colors.text];

			const amountTitle = document.createElement('p');
			const a = document.createTextNode(toString);
			amountTitle.style.color = color;
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

			while (chartRoot.firstChild) {
				chartRoot.firstChild.remove();
			}

			while (dataContainer.firstChild) {
				dataContainer.firstChild.remove();
			}

			chartRoot.appendChild(c);
			dataContainer.appendChild(dateText);
			dataContainer.appendChild(amountTitle);
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
Chart.register(Filler, CategoryScale, LinearScale, BarElement, Tooltip);

const BarChart: FC<IBarLineChart> = ({
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

	const [requestState, setRequestState] = useState(ERequestState.unset);

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
		let gradientFill: CanvasGradient | undefined;

		try {
			let gradientStartColor = '';
			let gradientEndColor = '';

			switch (chartColor) {
				case ETextColor.positive:
					gradientStartColor = theme.colors.chart.positive.gradientStart;
					gradientEndColor = theme.colors.chart.positive.gradientEnd;
					break;
				case ETextColor.negative:
					gradientStartColor = theme.colors.chart.negative.gradientStart;
					gradientEndColor = theme.colors.chart.negative.gradientEnd;
					break;
				default: // ETextColor.default
					gradientStartColor = theme.colors.chart.default.gradientStart;
					gradientEndColor = theme.colors.chart.default.gradientEnd;
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
			gradientFill?.addColorStop(0, `${gradientStartColor}`);
			gradientFill?.addColorStop(1, `${gradientEndColor}`);
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
					grid: { display: false },
					fill: true,
					pointRadius: 5,
					backgroundColor: gradientFill,
					hoverBackgroundColor: theme.colors.text[chartColor as keyof typeof theme.colors.text] + '80'
				}
			]
		};
	}, [xData, yData, theme, chartId, chartHeight, chartColor]);

	const chartOptions = useMemo(() => {
		const data: Chart.ChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			animation: {}, //chartAnimation,
			interaction: {
				mode: 'x',
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
							return ingValue?.toString || '';
						}
					},
					min: minValue,
					max: maxValue
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
	}, [deactivateLegend, maxValue, minValue, chartId, theme.colors, unit, decimals, chartColor]);

	const chartReady = useMemo(() => {
		if (minValue && maxValue && chartOptions) {
			return true;
		}

		return false;
	}, [minValue, maxValue, chartOptions]);

	const fetchChartData = useCallback(async () => {
		if (dailyType) {
			setRequestState(ERequestState.loading);
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

				setRequestState(ERequestState.success);
			} catch (err) {
				setRequestState(ERequestState.error);
				console.error('Error fetchChartData', err);
			}
		}
	}, [dailyType, chainId]);

	useEffect(() => {
		fetchChartData();
	}, [fetchChartData]);

	return requestState === ERequestState.loading ? (
		<StyledChartContainer chartHeight={chartHeight}>
			<div id={chartId} className='relative overflow-hidden'>
				<BMSkeleton width={'100%'} height={'100%'} />
			</div>
		</StyledChartContainer>
	) : requestState === ERequestState.success ? (
		<StyledChartContainer chartHeight={chartHeight}>
			<div id={chartId}>
				{/* @ts-ignore */}
				<Bar options={chartOptions} data={chartReady ? datas() : null} />
			</div>
		</StyledChartContainer>
	) : (
		<StyledChartContainer chartHeight={chartHeight}>
			<div id={chartId} className='relative overflow-hidden'>
				<Flex fullWidth fullHeight vertical={EFlex.center} horizontal={EFlex.center}>
					<BMText size={ESize.m} textColor={ETextColor.negative}>
						{`Can't fetch chart data`}
					</BMText>
				</Flex>
			</div>
		</StyledChartContainer>
	);
};

export { BarChart };
