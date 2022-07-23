import React, { FC, useMemo } from 'react';
import { ESize, ETextColor, ETextWeight } from '../../utils/enum';
import { StyledBMExternalLink } from './BMExternalLink.styles';
import { IBMExternalLink } from './BMExternalLink.type';

const BMExternalLink: FC<IBMExternalLink> = ({
	href,
	size = ESize.l,
	inheritStyles = false,
	weight = ETextWeight.normal,
	textColor = ETextColor.accent,
	...otherProps
}) => {
	const formattedLabel = useMemo(() => {
		if (!href) {
			return '';
		}

		// remove protocol from href and last slash from href
		const hrefWithoutProtocol = href.replace(/^https?:\/\//, '').replace(/\/$/, '');

		return hrefWithoutProtocol;
	}, [href]);

	return (
		<StyledBMExternalLink
			href={href}
			size={size}
			inheritStyles={inheritStyles}
			weight={weight}
			textColor={textColor}
			target='_blank'
			rel='noopener noreferrer'
			{...otherProps}
		>
			{formattedLabel}
		</StyledBMExternalLink>
	);
};

export { BMExternalLink };