import React, { FC } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import { BMCardContainer } from '../../../../styles/theme/components/BMCardContainer';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, ESize, ETextAlign, ETextColor, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';

const GithubCard: FC = () => {
	return (
		<BMCardContainer clickable>
			<Flex fullWidth direction={EFlex.column} horizontal={EFlex.center} vertical={EFlex.center} padding={ESize.m}>
				<BMText size={ESize['2xl']} textAlign={ETextAlign.center}>
					Your favorite blockchain isn’t listed?
				</BMText>

				<Spacing size={ESize.xs} />

				<a href='https://github.com/JeremyTheintz/block-metrics/issues' target='_blank' rel='noopener noreferrer'>
					<BMText size={ESize.m} textAlign={ETextAlign.center} weight={ETextWeight.light}>
						Create a
						<BMText type={ETextType.span} textColor={ETextColor.gradient}>
							{' Github issue '}
						</BMText>
						with some details
					</BMText>
				</a>
			</Flex>
		</BMCardContainer>
	);
};

export { GithubCard };
