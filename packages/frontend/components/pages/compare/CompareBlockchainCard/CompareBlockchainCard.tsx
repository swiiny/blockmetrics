import React, { FC, useMemo } from 'react';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMGradientSeparator from '../../../../styles/theme/components/BMGradientSeparator';
import BMIcon from '../../../../styles/theme/components/BMIcon';
import BMText from '../../../../styles/theme/components/BMText';
import { EDirection, EFlex, EIcon, ESize } from '../../../../styles/theme/utils/enum';
import { TBlockchain } from '../../../../types/blockchain';
import { getEngNotation } from '../../../../utils/convert';
import CompareBlockchainData from '../CompareBlockchainData';
import { ICompareData } from '../CompareBlockchains/CompareBlockchains.type';
import { StyledListItem } from './CompareBlockchainsCard.styles';

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
		total_value_locked
	} = blockchain;

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
		}

		if (blockchain_power_consumption) {
			const { value, unit } = getEngNotation(blockchain_power_consumption, 'Wh');

			result.push({
				value: value,
				unit: unit,
				isAnimated: true,
				label: '24H Power Consumption',
				icon: EIcon.energy,
				colorAnimationOnUpdate: true,
				reverseColor: true
			});
		}

		if (gas_price) {
			result.push({
				value: Math.floor(gas_price * 10 ** -9),
				unit: 'Gwei',
				label: 'Gas Price',
				icon: EIcon.gas,
				colorAnimationOnUpdate: true
			});
		}

		if (total_value_locked) {
			const { value, unit } = getEngNotation(total_value_locked, '$');

			result.push({
				value: value,
				unit: unit,
				label: 'Total Value Locked',
				icon: EIcon.chart,
				colorAnimationOnUpdate: true
			});
		}

		return result.slice(0, 4);
	}, [token_count, blockchain_power_consumption, gas_price, total_value_locked]);

	return (
		<StyledListItem key={id} isVisible={isSelected}>
			<BMCardContainer fullWidth marginTop={ESize.l} padding={ESize.l} animateApparition>
				<Flex horizontal={EFlex.between} vertical={EFlex.center}>
					<Column columns={4}>
						<Flex horizontal={EFlex.start} vertical={EFlex.center}>
							<BMIcon type={icon} size={ESize.m} />

							<Spacing size={ESize.s} />

							<BMText size={ESize['3xl']}>{name}</BMText>
						</Flex>
					</Column>

					<BMGradientSeparator direction={EDirection.vertical} />

					<Column columns={7}>
						<Flex horizontal={EFlex.between} vertical={EFlex.center}>
							{compareData.map((data: ICompareData) => (
								<CompareBlockchainData key={data.label} {...data} />
							))}
						</Flex>
					</Column>
				</Flex>
			</BMCardContainer>
		</StyledListItem>
	);
};

export { CompareBlockchainCard };
