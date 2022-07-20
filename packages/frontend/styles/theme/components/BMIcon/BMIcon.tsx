import Image from 'next/image';
import React, { FC, useMemo } from 'react';
import { EIcon, ESize, ETextColor } from '../../utils/enum';
import { StyledBackground, StyledIcon } from './BMIcon.styles';
import { IBMIcon } from './BMIcon.type';

const BMIcon: FC<IBMIcon> = ({ type = EIcon.none, size = ESize.l, backgroundVisible = false, ...otherProps }) => {
	if (type === EIcon.none) {
		return <></>;
	}

	return (
		<StyledBackground backgroundVisible={backgroundVisible}>
			<StyledIcon size={size} {...otherProps}>
				<Image src={`/assets/icons/${type}.svg`} layout='fill' />
			</StyledIcon>
		</StyledBackground>
	);
};

export { BMIcon };
