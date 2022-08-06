import styled, { css } from 'styled-components';
import { EMediaQuery, ESize } from '../../utils/enum';
import { addTransition, mq } from '../../utils/functions';
import { IBMProgressBar } from './BMProgressBar.type';

export const StyledBMProgressBar = styled.div<IBMProgressBar>`
	${(p) => css`
		position: relative;

		width: 100%;

		background: linear-gradient(to bottom, #454a75 0%, #ba92b220 100%);

		overflow: hidden;

		${() => {
			switch (p.size) {
				case ESize.s:
					return `
					height: 10px;
					border-radius: 5px;
					`;
				case ESize.m:
					return `
					height: 20px;
					border-radius: 10px;
					`;
				case ESize.l:
					return `
					height: 30px;
					border-radius: 15px;
					`;
				default:
					return `
					height: 30px;
					border-radius: 15px;
					`;
			}
		}}

		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;

			width: ${p.value}%;

			background: ${p.theme.colors.gradient.toBottom};

			border-radius: inherit;

			${addTransition()}
		}
	}
	`}
`;

export const StyledEndValue = styled.div<IBMProgressBar & { isLowValue?: boolean }>`
	${(p) => css`
		position: absolute;

		display: flex;
		justify-content: center;
		align-items: center;

		width: 40px;
		height: auto;
		left: calc(${p.value}% - 20px);

		padding: 7px 12px;
		border-radius: 10px;
		border: 1px solid #474747;
		box-shadow: 0px 12px 24px 0px #0000004d inset;
		background-color: #31393e;
		z-index: 2;

		${() => {
			switch (p.size) {
				case ESize.s:
					return `
					bottom: 18px;
					`;
				case ESize.m:
					return `
					bottom: 26px;
					`;
				case ESize.l:
					return `
					bottom: 34px;
					`;
				default:
					return `
					bottom: 26px;
					`;
			}
		}}

		${p.isLowValue
			? css`
					bottom: -8px;
					left: calc(${p.value}% + 8px);

					${() => {
						switch (p.size) {
							case ESize.s:
								return `
					bottom: -12px;
					`;
							case ESize.m:
								return `
					bottom: -8px;
					`;
							case ESize.l:
								return `
					bottom: -8px;
					`;
							default:
								return `
					bottom: 8px;
					`;
						}
					}}
			  `
			: ''}
	`}
`;

export const StyledArrow = styled.div<{ isLowValue?: boolean }>`
	position: absolute;
	bottom: -6px;

	z-index: 1;

	${mq(
		EMediaQuery.md,
		`
		right: calc(50% - 5px);
	`
	)}

	& > span {
		display: block;

		width: 10px;
		height: 10px;

		transform: rotate(45deg);

		background: linear-gradient(135deg, #31393e00 0%, #31393e00 49%, #31393e 50%, #31393e 100%);

		border: 1px solid #474747;

		border-top: none;
		border-left: none;
	}

	${(p) =>
		p.isLowValue
			? css`
					left: -6px;
					bottom: unset;

					& > span {
						transform: rotate(135deg);
					}
			  `
			: ''}
`;
