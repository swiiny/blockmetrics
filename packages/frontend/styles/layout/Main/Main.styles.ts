import styled from 'styled-components';
import { ESize } from '../../theme/utils/enum';

const Main = styled.main<{ paddingTop?: ESize.s | ESize.m | ESize.l | ESize.xl }>`
	margin-top: 120px;
	padding-bottom: 40px;

	${(p) => {
		switch (p.paddingTop) {
			case ESize.s:
				return `padding-top: 40px;`;
			case ESize.m:
				return `padding-top: 80px;`;
			case ESize.l:
				return `padding-top: 120px;`;
			case ESize.xl:
				return `padding-top: 160px;`;
			default:
				return `padding-top: 40px;`;
		}
	}}
`;

export { Main };
