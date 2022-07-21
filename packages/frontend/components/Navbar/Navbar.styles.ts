import styled, { css } from 'styled-components';
import { EMediaQuery } from '../../styles/theme/utils/enum';
import { addTransition, mq } from '../../styles/theme/utils/functions';

export const StyledNavbar = styled.nav<{ isHidden?: boolean; isBlurred: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;

	width: 100%;
	height: 120px;

	padding: 0 ${(p) => p.theme.spacing['4xl']};

	${(p) => mq(EMediaQuery.lg, `padding: 0 ${p.theme.spacing['xl']}`)}

	${mq(
		EMediaQuery.md,
		css`
			flex-direction: column;
			justify-content: flex-start;
			height: auto;

			& > div:nth-child(1) {
				height: 120px;
			}
		`
	)}

	${mq(EMediaQuery.sm, `padding: 0 15px;`)}

	${addTransition()}

	backdrop-filter: blur(10px);

	${(p) => (p.isHidden ? `display: none;` : '')}
	${(p) => (p.isBlurred ? `background-color: ${p.theme.colors.bg}50;` : `background-color: ${p.theme.colors.bg}00;`)}
`;

export const StyledList = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	${mq(EMediaQuery.sm, `flex-direction: column;`)}
`;

export const StyledNavbarItem = styled.li`
	& > a {
		display: inline-block;
		margin: 0 ${(p) => p.theme.spacing.s};
		padding: ${(p) => p.theme.spacing.s} 0;
	}

	&:nth-child(1) a {
		margin-left: 0;
	}

	&:nth-last-child(1) a {
		margin-right: 0;
	}

	${mq(
		EMediaQuery.sm,
		`
		& > a {
			margin-left: 0;
			margin-right: 0;
		}
	`
	)}
`;

export const StyledBurgerButton = styled.button`
	position: relative;

	width: 40px;
	height: 40px;

	padding: 0;

	background-color: transparent;
	border: none;

	perspective: 500px;

	cursor: pointer;
`;

export const StyledCube = styled.div<{ value: number }>`
	position: absolute;

	top: 50%;
	left: 50%;

	width: 0px;
	height: 0px;
	transform-style: preserve-3d;

	${addTransition()}

	transform: ${({ value }) => {
		switch (value) {
			case 0:
				return 'rotateY(0deg) rotateX(0deg) rotateZ(0deg);';
			case 1:
				return 'rotateY(-90deg) rotateX(90deg) rotateZ(0deg);';
			case 2:
				return 'rotateY(180deg) rotateX(0deg) rotateZ(180deg);';
			case 3:
				return 'rotateY(270deg) rotateX(90deg) rotateZ(180deg);';
			case 4:
				return 'rotateY(90deg) rotateX(180deg) rotateZ(180deg);';
			case 5:
				return 'rotateY(270deg) rotateX(180deg) rotateZ(-90deg);';
			case 6:
				return 'rotateY(0deg) rotateX(0deg) rotateZ(0deg);';
			default:
				return 'rotateY(90deg) rotateX(0deg) rotateZ(-90deg);';
		}
	}};
`;

export const StyledFace = styled.div<{ faceIndex: number; faceVisible: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	position: absolute;

	margin: -20px;
	width: 40px;
	height: 40px;

	${({ faceIndex }) => {
		const i = faceIndex > 5 ? 1 : 0;
		const m = faceIndex < 5 ? faceIndex - 1 : (-1) ** (faceIndex - 1);

		return css`
			transform: rotate3d(${i}, calc(1 - ${i}), 0, calc(${m} * 90deg)) translateZ(20px);
		`;
	}}

	& > span {
		position: absolute;

		height: 2px;
		width: 100%;
		background-color: ${(p) => p.theme.colors.deepBlue};
		display: block;

		${addTransition()}
		${({ faceVisible }) => (faceVisible ? 'opacity: 1;' : 'opacity: 0;')}

		&:nth-child(1) {
			margin-bottom: 20px;
		}

		&:nth-child(3) {
			margin-top: 20px;
		}

		${({ faceIndex }) => {
			if (faceIndex % 2 !== 0) {
				return css`
					&:nth-child(1) {
						transform: rotateZ(0deg);
					}
					&:nth-child(3) {
						transform: rotateZ(0);
					}
				`;
			}

			return css`
				&:nth-child(1) {
					transform: rotateZ(-45deg);
					margin-bottom: 0;
				}

				&:nth-child(2) {
					width: 0;
				}

				&:nth-child(3) {
					margin-top: 0;
					transform: rotateZ(45deg);
				}
			`;
		}};
	}
`;
