import React, { FC } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize, ETextAlign } from '../../../../styles/theme/utils/enum';
import ItemLink from '../../../utils/ItemLink';
import { IAboutCard } from './AboutCard.type';

const AboutCard: FC<IAboutCard> = ({ icon = EIcon.none, label, bottomContent, link }) => {
	return (
		<BMCardContainer clickable isHighlighted animateApparition>
			<Flex fullWidth direction={EFlex.column} horizontal={EFlex.center} vertical={EFlex.center} padding={ESize.m}>
				<BMIcon type={icon} size={ESize.m} backgroundVisible />

				<Spacing size={ESize.s} />

				<BMText size={ESize['2xl']} textAlign={ETextAlign.center}>
					{label}
				</BMText>

				<Spacing size={ESize.xs} />

				{bottomContent}
			</Flex>

			{link && <ItemLink href={link} ariaLabel={label + ' - ' + bottomContent} />}
		</BMCardContainer>
	);
};

export { AboutCard };
