import styled, { css } from 'styled-components';

export const StyledChartContainer = styled.div<{ chartHeight?: number }>`
	${(p) => css`
		position: relative;
		width: 100%;
		height: ${`${p.chartHeight}px`};
		z-index: 0;
		[id^='chart-container'] {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
	`}
`;
