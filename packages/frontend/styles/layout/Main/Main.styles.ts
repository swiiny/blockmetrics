import styled from 'styled-components';
import { EMediaQuery, ESize } from '../../theme/utils/enum';
import { mq } from '../../theme/utils/functions';

const Main = styled.main<{
	noMarginTop?: boolean;
	noPaddingBottom?: boolean;
	paddingTop?: ESize.s | ESize.m | ESize.l | ESize.xl | ESize.unset;
	noNavbar?: boolean;
}>`
	min-height: calc(100vh - 120px - 250px);
	padding-bottom: 160px;

	${({ noMarginTop }) => (!noMarginTop ? 'margin-top: 120px;' : 'margin-top: 0;')}

	${(p) =>
		mq(
			EMediaQuery.sm,
			`
		padding-bottom: 80px;

		${p.noPaddingBottom ? 'padding-bottom: 0px;' : ''}
	`
		)}

	${({ noPaddingBottom }) => (noPaddingBottom ? 'padding-bottom: 0px;' : '')}

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
			case ESize.unset:
				return `padding-top: 0px;`;
			default:
				return `padding-top: 40px;`;
		}
	}}
`;

export { Main };
