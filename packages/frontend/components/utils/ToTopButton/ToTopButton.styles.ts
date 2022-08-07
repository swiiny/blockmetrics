import styled, { css } from 'styled-components';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import { addTransition } from '../../../styles/theme/utils/functions';

export const BMCardContainerEx = styled(BMCardContainer)<{ isVisible?: boolean }>`
	position: fixed;
	bottom: 40px;
	right: 40px;

	${addTransition()}

	perspective: 1000px;
	transform-origin: bottom center;
	transform-style: preserve-3d;

	${(p) =>
		p.isVisible
			? css`
					transform: translateY(0px) rotateY(0deg) rotateZ(0deg);
					opacity: 1;
			  `
			: css`
					transform: translateY(0px) rotateY(90deg) rotateZ(90deg);
					opacity: 0;
			  `}
`;
