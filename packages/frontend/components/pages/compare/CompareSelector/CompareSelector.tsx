import React, { FC, useEffect } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize } from '../../../../styles/theme/utils/enum';
import { BLOCKCHAINS, BLOCKCHAINS_ARRAY } from '../../../../utils/variables';
import ItemButton from '../../../utils/ItemButton';
import { StyledListItem, StyledSelectCircle, StyledSelectSquare } from './CompareSelector.styles';
import { ICompareSelector } from './CompareSelector.type';

const CompareSelector: FC<ICompareSelector> = ({ blockchains, onSelectBlockchain, selectedBlockchainIds }) => {
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

					<ItemButton onClick={() => onSelectBlockchain(null)} />
				</BMCardContainer>
			</Flex>

			<Spacing size={ESize.xs} />

			<BMCardContainer fullWidth paddingX={ESize.xl} paddingY={ESize.m}>
				<Flex as='ul' vertical={EFlex.center} horizontal={EFlex.start} fullWidth>
					{blockchains.map(({ id, name }) => (
						<StyledListItem key={id}>
							<StyledSelectCircle isSelected={selectedBlockchainIds.includes(id)} />

							<Flex direction={EFlex.column} vertical={EFlex.center} horizontal={EFlex.center}>
								<BMIcon
									type={BLOCKCHAINS_ARRAY.find(({ id: chainId }) => chainId === id)?.icon}
									size={ESize.s}
									backgroundVisible
									backgroundSize={ESize.xs}
									backgroundRadius={ESize.s}
								/>

								<Spacing size={ESize['4xs']} />

								<BMText size={ESize.m}>{name}</BMText>
							</Flex>

							<ItemButton onClick={() => onSelectBlockchain(id)} />
						</StyledListItem>
					))}
				</Flex>
			</BMCardContainer>
		</>
	);
};

export { CompareSelector };
