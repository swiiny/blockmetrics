import React, { FC } from 'react';
import Flex from '../../../layout/Flex';
import Spacing from '../../../layout/Spacing';
import { EFlex, ESize, ETextWeight } from '../../utils/enum';
import BMText from '../BMText';
import { StyledBMProgressBar } from './BMProgressBar.styles';
import { IBMProgressBar } from './BMProgressBar.type';

const BMProgressBar: FC<IBMProgressBar> = ({ label, size = ESize.s, value = 0 }) => {
	return (
		<Flex direction={EFlex.column} fullWidth>
			{label ? (
				<BMText size={size} weight={ETextWeight.medium}>
					{label}
				</BMText>
			) : (
				<></>
			)}

			<Spacing size={ESize['3xs']} />

			<StyledBMProgressBar value={value} size={size} />
		</Flex>
	);
};
export { BMProgressBar };
