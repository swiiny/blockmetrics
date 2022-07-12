import styled from 'styled-components';
import { IEclipse } from './Eclipse.type';
import { mq } from '../../../styles/theme/utils/functions';
import { EMediaQuery, EPosition, ESize } from '../../../styles/theme/utils/enum';

export const StyledEclipse = styled.span<IEclipse>`
	position: absolute;
	left: -50%;

	z-index: ${(p) => p.zIndex};

	height: 1500px;
	width: 1500px;

	border-radius: 50%;

	opacity: 0.25;

	background-color: ${(p) => p.theme.colors.secondary};

	${mq(EMediaQuery.sm, `transform: scale(0.75);`)}

	${(p) => {
		let width: string;
		let height: string;

		let left: string;
		let top: string;
		let right: string;
		let bottom: string;

		let blur: string = '200px';

		switch (p.size) {
			case ESize['2xs']:
				height = '120px';
				width = '120px';
				blur = '70px';
				break;
			case ESize.xs:
				height = '250px';
				width = '250px';
				blur = '70px';
				break;
			case ESize.s:
				height = '500px';
				width = '500px';
				blur = '200px';
				break;
			case ESize.m:
				height = '1000px';
				width = '1000px';
				break;
			case ESize.l:
				height = '1500px';
				width = '1500px';
				break;
			case ESize.xl:
				height = '2000px';
				width = '2000px';
				break;
			default:
				height = '1500px';
				width = '1500px';
				break;
		}

		switch (p.position) {
			case EPosition.top:
				left = `calc(50% - (${width} / 2))`;
				top = `calc(-${height} / 4)`;
				right = 'unset';
				bottom = 'unset';
				break;
			case EPosition.topLeft:
				left = `calc(-${width} / 2)`;
				top = `calc(-${height} / 2)`;
				right = 'unset';
				bottom = 'unset';
				break;
			case EPosition.topRight:
				right = `calc(-${width} / 2)`;
				top = `calc(-${height} / 2)`;
				left = 'unset';
				bottom = 'unset';
				break;
			case EPosition.bottom:
				left = `calc(50% - (${width} / 2))`;
				bottom = `calc(-${height} / 2)`;
				right = 'unset';
				top = 'unset';
				break;
			case EPosition.bottomLeft:
				left = `calc(-${width} / 2)`;
				bottom = `calc(-${height} / 2)`;
				right = 'unset';
				top = 'unset';
				break;
			case EPosition.bottomRight:
				right = `calc(-${width} / 2)`;
				bottom = `calc(-${height} / 2)`;
				left = 'unset';
				top = 'unset';
				break;
			case EPosition.left:
				left = `calc(-${width} / 2)`;
				top = `calc(50% - (${height} / 2))`;
				right = 'unset';
				bottom = 'unset';
				break;
			case EPosition.right:
				right = `calc(-${width} / 2)`;
				top = `calc(50% - (${height} / 2))`;
				left = `unset`;
				bottom = 'unset';
				break;
			default:
				left = `calc(50% - (${width} / 2))`;
				top = `calc(50% - (${height} / 2))`;
				right = 'unset';
				bottom = 'unset';
				break;
		}

		return `
				filter: blur(${blur});
        width: ${width};
        height: ${height};
        top: ${top};
        left: ${left};
        right: ${right};
        bottom: ${bottom};
      `;
	}}
`;
