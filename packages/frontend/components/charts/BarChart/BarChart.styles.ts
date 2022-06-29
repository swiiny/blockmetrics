import styled from 'styled-components';
import { IChartContainer } from './BarChart.type';

export const StyledChartContainer = styled.div<IChartContainer>`
	position: relative;
	width: 100%;
	height: ${(p) => p.containerHeight};
	margin-top: ${(p) => p.containerMarginTop};
	z-index: -1;
	#chart-container {
		position: absolute;
		height: ${(p) => p.chartHeight};
		bottom: ${(p) => p.chartVerticalDelta};
		left: 0;
		right: 0;
	}
`;
