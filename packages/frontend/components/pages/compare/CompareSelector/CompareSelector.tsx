import React, { FC } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize } from '../../../../styles/theme/utils/enum';
import ItemButton from '../../../utils/ItemButton';
import { StyledListItem, StyledSelectedCircle, StyledSelectSquare } from './CompareSelector.styles';
import { ICompareSelector } from './CompareSelector.type';

const CompareSelector: FC<ICompareSelector> = ({ blockchains, onSelectBlockchain }) => {
	return (
		<>
			<Flex fullWidth vertical={EFlex.center} horizontal={EFlex.between}>
				<BMText size={ESize.xl}>Select the blockchains you want to compare</BMText>

				<BMCardContainer paddingX={ESize.s} paddingY={ESize['2xs']} borderRadius={ESize['3xs']} clickable>
					<Flex vertical={EFlex.center}>
						<StyledSelectSquare />

						<Spacing size={ESize.xs} />

						<BMText size={ESize.m}>Unselect all</BMText>
					</Flex>

					<ItemButton onClick={() => onSelectBlockchain(null)} ariaLabel='select or unselect all' />
				</BMCardContainer>
			</Flex>

			<Spacing size={ESize.xs} />

			<BMCardContainer fullWidth paddingX={ESize.xl} paddingY={ESize.m}>
				<Flex as='ul' vertical={EFlex.center} horizontal={EFlex.start} fullWidth>
					{blockchains.map(({ id, icon, name, isSelected }) => (
						<StyledListItem key={id}>
							<StyledSelectedCircle isSelected={isSelected}>
								<BMIcon type={EIcon.check} size={ESize['2xs']} isVisible={isSelected} />
							</StyledSelectedCircle>

							<Flex direction={EFlex.column} vertical={EFlex.center} horizontal={EFlex.center}>
								<BMIcon
									type={icon}
									size={ESize.s}
									backgroundVisible
									backgroundSize={ESize.xs}
									backgroundRadius={ESize.s}
								/>

								<Spacing size={ESize['4xs']} />

								<BMText size={ESize.m}>{name}</BMText>
							</Flex>

							<ItemButton
								onClick={() => onSelectBlockchain(id)}
								ariaLabel={`${isSelected ? 'un' : ''}select ${name} blockchain`}
							/>
						</StyledListItem>
					))}
				</Flex>
			</BMCardContainer>
		</>
	);
};

export { CompareSelector };
