import React, { FC, useMemo, useState } from 'react';
import Flex from '../../../styles/layout/Flex';
import Spacing from '../../../styles/layout/Spacing';
import BMText from '../../../styles/theme/components/BMText';
import { EDailyData, EFlex, EIcon, ESize, ETextColor, ETextType, ETextWeight } from '../../../styles/theme/utils/enum';
import { BLOCKCHAINS_ARRAY } from '../../../utils/variables';
import { NAVBAR_LINKS } from '../../Navbar/Navbar';
import { IBlockchainCard } from './BlockchainCard.type';
import CountUp from 'react-countup';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../styles/theme/components/BMIcon';
import { FlexEx } from './BlockchainCard.styles';
import Column from '../../../styles/layout/Column';
import LineChart from '../../charts/LineChart';
import BMButton from '../../../styles/theme/components/BMButton';
import BMProgressBar from '../../../styles/theme/components/BMProgressBar';
import ItemLink from '../../utils/ItemLink';
import useResponsive from '../../../hooks/useResponsive';

const BlockchainCard: FC<IBlockchainCard> = ({ data, emptyItem = false }) => {
	const { isSmallerThanSm } = useResponsive();

	if (emptyItem) {
		return <li className='empty' />;
	}

	const {
		id,
		name,
		note,
		node_count,
		testnet_node_count,
		single_node_power_consumption,
		blockchain_power_consumption,
		hashrate,
		difficulty,
		last_block_timestamp,
		token_count,
		transaction_count,
		gas_price,
		consensus,
		address_count,
		today_address_count,
		today_transaction_count
	} = data || {};

	const blockchain = useMemo((): {
		estimatedTimeBetweenBlocks: number;
		icon: EIcon;
	} => {
		let newBlockchain;

		let defaultBlockchain = {
			estimatedTimeBetweenBlocks: 0,
			icon: EIcon.none
		};

		if (id) {
			newBlockchain = BLOCKCHAINS_ARRAY.find((bc) => bc.id === id);
		}

		return newBlockchain || defaultBlockchain;
	}, [id]);

	const linkTo = useMemo(() => {
		try {
			let formattedName = name?.toLowerCase().replace(/\s/g, '-');

			return NAVBAR_LINKS.blockchains.href + '/' + formattedName;
		} catch {
			return '#';
		}
	}, [name]);

	const gweiGasPrice = useMemo(() => {
		if (gas_price) {
			return Math.floor(gas_price / 10 ** 9);
		}

		return null;
	}, [gas_price]);

	const rank = useMemo(() => {
		return 'A+';
	}, [note]);

	return (
		<BMCardContainer as='li' clickable isHighlighted={isSmallerThanSm}>
			<Flex direction={EFlex.column} horizontal={EFlex.center} paddingX={ESize.s} paddingY={ESize.s}>
				<Flex fullWidth wrapItems horizontal={EFlex.between} vertical={EFlex.center}>
					<Flex vertical={EFlex.center}>
						<BMIcon
							type={blockchain.icon}
							size={isSmallerThanSm ? ESize.s : ESize.s}
							backgroundVisible={!isSmallerThanSm}
							backgroundRadius={ESize.s}
							backgroundSize={ESize.xs}
						/>

						<Spacing size={ESize['2xs']} />

						<BMText size={ESize.l} weight={ETextWeight.semiBold}>
							{name}
						</BMText>
					</Flex>

					<BMCardContainer secondary>
						<FlexEx horizontal={EFlex.between} paddingY={ESize['5xs']} paddingX={ESize['s']}>
							<BMText size={ESize.m} weight={ETextWeight.medium}>
								Tokens:
							</BMText>
							<BMText size={ESize.m} weight={ETextWeight.medium}>
								<CountUp start={0} prefix=' ' end={token_count || 0} />
							</BMText>
						</FlexEx>
					</BMCardContainer>
				</Flex>

				<Spacing size={ESize['xs']} />

				<BMCardContainer secondary fullWidth>
					<Flex fullWidth horizontal={EFlex.between} paddingY={ESize['xs']} paddingX={ESize['s']}>
						<Flex vertical={EFlex.center}>
							<BMIcon type={EIcon.gas} size={ESize.xs} />

							<Spacing size={ESize['4xs']} />

							<BMText size={ESize.m} weight={ETextWeight.medium}>
								Gas Price
							</BMText>
						</Flex>

						<BMText size={ESize.l} weight={ETextWeight.medium} textColor={ETextColor.accent}>
							{gweiGasPrice ? `${gweiGasPrice} Gwei` : '-'}
						</BMText>
					</Flex>
				</BMCardContainer>

				<Spacing size={ESize['xs']} />

				<Flex fullWidth horizontal={EFlex.between}>
					<Column columns={8} fullHeight>
						<BMCardContainer tertiary paddingX={ESize['2xs']} paddingY={ESize['3xs']}>
							<BMText size={ESize.s} weight={ETextWeight.medium}>
								Power Consumption Level
							</BMText>

							<Spacing size={ESize.xs} />

							<LineChart dailyType={EDailyData.powerConsumption} chainId={id} deactivateLegend chartHeight={54} />
						</BMCardContainer>
					</Column>

					<Column columns={3} fullHeight>
						<BMCardContainer tertiary paddingX={ESize['2xs']} paddingY={ESize['3xs']} fullHeight>
							<Flex fullHeight direction={EFlex.column} horizontal={EFlex.center} vertical={EFlex.center}>
								<BMText size={ESize['2xl']} weight={ETextWeight.semiBold}>
									{rank}
								</BMText>

								<Spacing size={ESize['4xs']} />

								<BMText size={ESize.s} weight={ETextWeight.normal}>
									Rank
								</BMText>
							</Flex>
						</BMCardContainer>
					</Column>
				</Flex>

				<Spacing size={ESize['xs']} />

				<Flex fullWidth smDirection={EFlex.column} horizontal={EFlex.between} vertical={EFlex.center}>
					<Column columns={7} sm={12}>
						<BMProgressBar label='Reliability' value={80} />
					</Column>

					<Spacing size={ESize.unset} smSize={ESize.m} />

					<BMButton fullWidth={isSmallerThanSm} secondary size={ESize.s}>
						Show More
					</BMButton>
				</Flex>
			</Flex>

			<ItemLink href={linkTo} internal />
		</BMCardContainer>
	);
};

export { BlockchainCard };
