import styled, { css } from 'styled-components';
import { EDirection, EMediaQuery, ESize } from '../../theme/utils/enum';
import { getSpacingFromESize, mq } from '../../theme/utils/functions';
import { ISpacing } from './Spacing.type';

const setRect = (direction: EDirection, index: EMediaQuery) => {
	return mq(
		index,
		css`
			${direction === EDirection.vertical
				? `margin-left: 0 !important; margin-right: 0 !important;`
				: direction === EDirection.horizontal
				? `margin-top: 0 !important; margin-bottom: 0 !important;`
				: ''}
		`
	);
};

export const StyledSpacing = styled.span<ISpacing>`
	display: inline-block;

	${({
		size,
		smSize,
		mdSize,
		lgSize,
		xlSize,
		xsDirection,
		smDirection,
		mdDirection,
		lgDirection,
		xlDirection,
		theme
	}) => css`
		height: 0;
		width: 0;

		margin: ${getSpacingFromESize(size, theme)};

		${({ theme }) => css`
			${xlSize
				? mq(
						EMediaQuery.xl,
						`
			${xlSize === ESize.unset ? 'display: none;' : ''}
			margin: ${getSpacingFromESize(xlSize, theme)}
			`
				  )
				: ''}
			${lgSize
				? mq(
						EMediaQuery.lg,
						`
			${lgSize === ESize.unset ? 'display: none;' : ''}
			margin: ${getSpacingFromESize(lgSize, theme)}
			`
				  )
				: ''}
			${mdSize
				? mq(
						EMediaQuery.md,
						`
			${mdSize === ESize.unset ? 'display: none;' : ''}
			margin: ${getSpacingFromESize(mdSize, theme)}
			`
				  )
				: ''}
			${smSize
				? mq(
						EMediaQuery.sm,
						`
			${smSize === ESize.unset ? 'display: none;' : ''}
			margin: ${getSpacingFromESize(smSize, theme)}
			`
				  )
				: ''}
		`}

		${xlDirection ? setRect(xlDirection, EMediaQuery.xl) : ''}
		${lgDirection ? setRect(lgDirection, EMediaQuery.lg) : ''}
		${mdDirection ? setRect(mdDirection, EMediaQuery.md) : ''}
		${smDirection ? setRect(smDirection, EMediaQuery.sm) : ''}

		${xsDirection === EDirection.vertical
			? `margin-left: 0 !important; margin-right: 0 !important;`
			: xsDirection === EDirection.horizontal
			? `margin-top: 0 !important; margin-bottom: 0 !important;`
			: ''}

		margin-left: 0 !important;
		margin-bottom: 0 !important;
	`}
`;
