import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import { ESize, ETextColor, ETextWeight } from '../../utils/enum';
import BMSkeleton from '../BMSkeleton';
import { StyledBMLink } from './BMLink.styles';
import { IBMLink } from './BMLink.type';

const BMLink: FC<IBMLink> = ({
	href,
	size = ESize.l,
	inheritStyles = false,
	weight = ETextWeight.normal,
	textColor = ETextColor.accent,
	loading = false,
	skWidth,
	skHeight,
	isInternal = false,
	children,
	...otherProps
}) => {
	const formattedLabel = useMemo(() => {
		if (!href) {
			return '';
		}

		if (children) {
			return children;
		}

		// remove protocol from href and last slash from href
		const hrefWithoutProtocol = href.replace(/^https?:\/\//, '').replace(/\/$/, '');

		return hrefWithoutProtocol;
	}, [href, children]);

	if (loading) {
		return <BMSkeleton width={skWidth} height={skHeight} />;
	}

	{
		return isInternal ? (
			<Link href={href || '#'} passHref>
				<StyledBMLink size={size} inheritStyles={inheritStyles} weight={weight} textColor={textColor} {...otherProps}>
					{formattedLabel}
				</StyledBMLink>
			</Link>
		) : (
			<StyledBMLink
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
			</StyledBMLink>
		);
	}
};

export { BMLink };
