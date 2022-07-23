import React, { FC, useMemo } from 'react';
import Spacing from '../../../layout/Spacing';
import { ESize, ETextWeight } from '../../utils/enum';
import BMText from '../BMText';
import { StyledBMListItem, StyledDot } from './BMListItem.styles';
import { IBMListItem } from './BMListItem.type';

const BMListItem: FC<IBMListItem> = ({ children, dotHidden = false, ...otherProps }) => {
	const memoizedChildren = useMemo(() => {
		if (typeof children === 'string') {
			return (
				<BMText size={ESize.s} weight={ETextWeight.light}>
					{children}
				</BMText>
			);
		} else {
			return children;
		}
	}, [children]);

	return (
		<StyledBMListItem {...otherProps}>
			{!dotHidden ? (
				<>
					<StyledDot />
					<Spacing size={ESize['2xs']} />
				</>
			) : (
				<></>
			)}

			{memoizedChildren}
		</StyledBMListItem>
	);
};

export { BMListItem };
