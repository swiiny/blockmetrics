import React, { FC, useMemo } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMSkeleton from '../../../../styles/theme/components/BMSkeleton';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, EIcon, ESize } from '../../../../styles/theme/utils/enum';
import ItemButton from '../../../utils/ItemButton';
import { StyledListItem, StyledSelectedCircle } from './CompareSelector.styles';
import { ICompareSelector } from './CompareSelector.type';

const CompareSelector: FC<ICompareSelector> = ({
	blockchains,
	onSelectBlockchain,
	selectedBlockchainIds,
	loading = false
}) => {
	const { isSmallerThanMd } = useResponsive();

	const SelectorButton = useMemo(() => {
		const isListEmpty = selectedBlockchainIds.length === 0;

		return (
			<BMCardContainer paddingX={ESize.s} paddingY={ESize['2xs']} borderRadius={ESize['3xs']} clickable>
				<BMText size={ESize.m}>{isListEmpty ? 'S' : 'Uns'}elect all</BMText>

				<ItemButton
					onClick={() => onSelectBlockchain(isListEmpty ? 'all' : null)}
					ariaLabel='select or unselect all blockchains'
				/>
			</BMCardContainer>
		);
	}, [onSelectBlockchain, selectedBlockchainIds.length]);

	const emptyItems = useMemo(() => {
		return [0, 1].map((value) => (
			<StyledListItem key={'empty-bc-item-' + value} isEmpty>
				<BMIcon type={EIcon.ethereum} size={ESize.s} backgroundVisible backgroundSize={ESize.xs} />
			</StyledListItem>
		));
	}, []);

	return (
		<>
			<Flex fullWidth vertical={EFlex.center} horizontal={EFlex.between}>
				<BMText size={ESize.xl}>Select the blockchains you want to compare</BMText>

				{!isSmallerThanMd ? loading ? <BMSkeleton width={ESize['8xl']} height={ESize.xl} /> : SelectorButton : <></>}
			</Flex>

			<Spacing size={ESize.xs} />

			<BMCardContainer
				fullWidth
				paddingX={ESize.xl}
				paddingY={ESize.m}
				mdPadding={ESize.unset}
				mdPaddingBottom={ESize.s}
				smPaddingX={ESize['4xs']}
				animateApparition
			>
				<Flex as='ul' vertical={EFlex.center} horizontal={EFlex.start} mdHorizontal={EFlex.between} fullWidth wrapItems>
					{blockchains.map(({ id, icon, name, isSelected }) => (
						<StyledListItem key={id}>
							<Flex direction={EFlex.column} vertical={EFlex.center} horizontal={EFlex.center}>
								<StyledSelectedCircle isSelected={isSelected}>
									<BMIcon type={EIcon.check} size={ESize['2xs']} isVisible={isSelected} />
								</StyledSelectedCircle>

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

					{emptyItems}
				</Flex>
			</BMCardContainer>

			<Flex fullWidth vertical={EFlex.center} horizontal={EFlex.center} marginTop={ESize.s}>
				{isSmallerThanMd ? loading ? <BMSkeleton width={ESize['8xl']} height={ESize.xl} /> : SelectorButton : <></>}
			</Flex>
		</>
	);
};

export { CompareSelector };
