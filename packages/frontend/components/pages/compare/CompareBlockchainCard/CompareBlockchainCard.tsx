import React, { FC, useMemo } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EDirection, EFlex, EIcon, ESize, ETextWeight } from '../../../../styles/theme/utils/enum';
import { TBlockchain } from '../../../../types/blockchain';
import { getEngNotation } from '../../../../utils/convert';
import { formatBlockchainNameToNameUrl, getRankColor, getRankFromScore } from '../../../../utils/functions';
import { NAVBAR_LINKS } from '../../../Navbar/Navbar';
import ItemButton from '../../../utils/ItemButton';
import CompareBlockchainData from '../CompareBlockchainData';
import { ICompareData } from '../CompareBlockchains/CompareBlockchains.type';
import { BMGradientSeparatorEx, StyledListItem } from './CompareBlockchainsCard.styles';
import router from 'next/router';
import ItemLink from '../../../utils/ItemLink';
import { StyledRank } from './CompareBlockchainCard.styles';

const CompareBlockchainCard: FC<TBlockchain> = (blockchain) => {
	const {
		id,
		name,
		icon,
		isSelected,
		token_count,
		gas_price,
		blockchain_power_consumption,
		today_transaction_count,
		score,
		total_value_locked,
		loading = false
	} = blockchain;

	const { isSmallerThanSm, isSmallerThanMd } = useResponsive();

	const compareData = useMemo<ICompareData[]>(() => {
		const result = [];
		if (token_count) {
			result.push({
				value: token_count,
				isAnimated: true,
				label: token_count <= 1 ? 'Token' : 'Tokens',
				icon: EIcon.token,
				colorAnimationOnUpdate: true,
				reverseColor: true
			});
		} else {
			result.push({
				value: 0,
				label: 'empty-token',
				icon: EIcon.none
			});
		}

		if (blockchain_power_consumption) {
			const { value, unit, fullToString } = getEngNotation(blockchain_power_consumption, 'Wh');

			result.push({
				value: value,
				unit: unit,
				isAnimated: true,
				label: '24H Power Consumption',
				icon: EIcon.energy,
				colorAnimationOnUpdate: true,
				fullValue: unit !== ' Wh' ? fullToString : undefined
			});
		} else {
			result.push({
				value: 0,
				label: 'empty-energy',
				icon: EIcon.none
			});
		}

		if (gas_price) {
			result.push({
				value: Math.floor(gas_price * 10 ** -9),
				unit: 'Gwei',
				label: 'Gas Price',
				icon: EIcon.gas,
				colorAnimationOnUpdate: true,
				fullValue: gas_price.toString() + ' wei'
			});
		} else {
			result.push({
				value: 0,
				label: 'empty-gasprice',
				icon: EIcon.none
			});
		}

		if (total_value_locked) {
			const { value, unit, fullToString } = getEngNotation(total_value_locked, '$');

			result.push({
				value: value,
				unit: unit,
				label: 'Total Value Locked',
				icon: EIcon.chart,
				colorAnimationOnUpdate: true,
				reverseColor: true,
				fullValue: unit !== ' $' ? fullToString : undefined
			});
		} else {
			result.push({
				value: 0,
				label: 'empty-tvl',
				icon: EIcon.none
			});
		}

		const maxItemCount = isSmallerThanSm ? 2 : isSmallerThanMd ? 3 : 4;

		return result.slice(0, maxItemCount);
	}, [token_count, blockchain_power_consumption, gas_price, total_value_locked, isSmallerThanSm, isSmallerThanMd]);

	const formattedNameUrl = useMemo(() => {
		if (!name) {
			return;
		}

		return formatBlockchainNameToNameUrl(name);
	}, [name]);

	const rankContainer = useMemo(() => {
		if (typeof score === 'undefined') {
			return <></>;
		}

		const rank = getRankFromScore(score);

		return (
			<StyledRank>
				<BMText
					size={ESize['xl']}
					textColor={getRankColor(rank)}
					weight={ETextWeight.bold}
					loading={!rank}
					skHeight={'60%'}
					skWidth={'60%'}
				>
					{rank}
				</BMText>
			</StyledRank>
		);
	}, [score]);

	return (
		<StyledListItem key={id} isVisible={isSelected}>
			<BMCardContainer
				fullWidth
				marginTop={ESize.l}
				padding={ESize.l}
				lgPadding={ESize.m}
				lgPaddingY={ESize.xl}
				mdPaddingY={ESize.m}
				smPadding={ESize.s}
				animateApparition
				isHighlighted
				clickable
			>
				{rankContainer}

				<Flex mdDirection={EFlex.column} horizontal={EFlex.between} vertical={EFlex.center}>
					<Column columns={3} md={12}>
						<Flex horizontal={EFlex.start} vertical={EFlex.center}>
							<BMIcon type={icon} size={!isSmallerThanMd ? ESize.m : ESize.s} />

							<Spacing size={ESize.s} />

							<BMText size={!isSmallerThanMd ? ESize['2xl'] : ESize.xl} weight={ETextWeight.semiBold}>
								{name}
							</BMText>
						</Flex>
					</Column>

					<BMGradientSeparatorEx
						direction={!isSmallerThanMd ? EDirection.vertical : EDirection.horizontal}
						mdMargin={ESize.s}
					/>

					<Column columns={8} md={12}>
						<Flex horizontal={EFlex.between} vertical={EFlex.center}>
							{compareData.map((data: ICompareData) => (
								<CompareBlockchainData key={data.label} {...data} loading={loading} />
							))}
						</Flex>
					</Column>
				</Flex>

				<ItemLink
					isInternal
					href={NAVBAR_LINKS.blockchains.href + '/' + formattedNameUrl}
					ariaLabel={`Buttton to go to ${name} page`}
				/>
			</BMCardContainer>
		</StyledListItem>
	);
};

export { CompareBlockchainCard };
