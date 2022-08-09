import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import Flex from '../../../styles/layout/Flex';
import Spacing from '../../../styles/layout/Spacing';
import BMText from '../../../styles/theme/components/BMText';
import { EDailyData, EFlex, EIcon, ESize, ETextColor, ETextWeight } from '../../../styles/theme/utils/enum';
import { BLOCKCHAINS_ARRAY } from '../../../utils/variables';
import { NAVBAR_LINKS } from '../../Navbar/Navbar';
import { IBlockchainCard } from './BlockchainCard.type';
import BMCardContainer from '../../../styles/theme/components/BMCardContainer';
import BMIcon from '../../../styles/theme/components/BMIcon';
import { FlexEx } from './BlockchainCard.styles';
import Column from '../../../styles/layout/Column';
import LineChart from '../../charts/LineChart';
import BMButton from '../../../styles/theme/components/BMButton';
import BMProgressBar from '../../../styles/theme/components/BMProgressBar';
import ItemLink from '../../utils/ItemLink';
import useResponsive from '../../../hooks/useResponsive';
import { getEngNotation } from '../../../utils/convert';
import { getRankColor } from '../../../utils/functions';

const BlockchainCard: FC<IBlockchainCard> = ({ data, emptyItem = false, loading = false }) => {
	const { isSmallerThanSm } = useResponsive();

	const cardRef = useRef<number>(0);

	const [gasPriceColor, setGasPriceColor] = useState<ETextColor>(ETextColor.accent);

	const { id, name, rank, token_count = 0, reliability = 0, gas_price, blockchain_power_consumption } = data || {};

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

	const rankColor = useMemo(() => {
		return getRankColor(rank);
	}, [rank]);

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

	const formattedPowerConsumption = useMemo(() => {
		if (blockchain_power_consumption) {
			try {
				return getEngNotation(blockchain_power_consumption, 'Wh', 2).toString;
			} catch {
				return '';
			}
		}

		return '';
	}, [blockchain_power_consumption]);

	useEffect(() => {
		if (gweiGasPrice) {
			setGasPriceColor(cardRef.current > gweiGasPrice ? ETextColor.positive : ETextColor.negative);

			cardRef.current = gweiGasPrice;

			setTimeout(() => {
				setGasPriceColor(ETextColor.accent);
			}, 700);
		}
	}, [gweiGasPrice]);

	if (emptyItem) {
		return <li className='empty' />;
	}

	return (
		<BMCardContainer as='li' clickable isHighlighted={isSmallerThanSm}>
			<Flex direction={EFlex.column} horizontal={EFlex.center} paddingX={ESize.s} paddingY={ESize.s}>
				<Flex fullWidth wrapItems horizontal={EFlex.between} vertical={EFlex.center}>
					<Flex vertical={EFlex.center}>
						<BMIcon type={blockchain.icon} size={isSmallerThanSm ? ESize.s : ESize.s} loading={loading} />

						<Spacing size={ESize['2xs']} />

						<BMText size={ESize.l} weight={ETextWeight.semiBold} loading={loading} skWidth={100} skHeight={ESize.m}>
							{name}
						</BMText>
					</Flex>

					<BMCardContainer secondary>
						<FlexEx horizontal={EFlex.between} vertical={EFlex.center} paddingY={ESize['5xs']} paddingX={ESize['s']}>
							<BMText size={ESize.m} weight={ETextWeight.medium}>
								Token{token_count > 1 ? 's' : ''}:
							</BMText>
							<BMText
								size={ESize.m}
								weight={ETextWeight.medium}
								loading={loading}
								skWidth={ESize.l}
								skHeight={ESize.xs}
							>
								{token_count}
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

						<BMText
							size={ESize.l}
							weight={ETextWeight.medium}
							textColor={gasPriceColor}
							loading={loading}
							skWidth={ESize.xl}
							skHeight={ESize.s}
						>
							{gweiGasPrice ? `${gweiGasPrice} Gwei` : '-'}
						</BMText>
					</Flex>
				</BMCardContainer>

				<Spacing size={ESize['xs']} />

				<Flex fullWidth horizontal={EFlex.between}>
					<Column columns={8} fullHeight>
						<BMCardContainer tertiary paddingX={ESize['2xs']} paddingY={ESize['3xs']}>
							<Flex horizontal={EFlex.between} vertical={EFlex.center}>
								<BMText size={ESize.s} weight={ETextWeight.medium}>
									Power Consumption
								</BMText>

								<BMText size={ESize.s} weight={ETextWeight.normal} textColor={ETextColor.negative}>
									{formattedPowerConsumption}
								</BMText>
							</Flex>

							<Spacing size={ESize.xs} />

							<LineChart
								color={ETextColor.negative}
								dailyType={EDailyData.powerConsumption}
								chainId={id}
								deactivateLegend
								chartHeight={54}
								noError
								noLoading
							/>
						</BMCardContainer>
					</Column>

					<Column columns={3} fullHeight>
						<BMCardContainer tertiary paddingX={ESize['2xs']} paddingY={ESize['3xs']} fullHeight>
							<Flex fullHeight direction={EFlex.column} horizontal={EFlex.center} vertical={EFlex.center}>
								<BMText
									size={ESize['2xl']}
									weight={ETextWeight.semiBold}
									loading={loading}
									textColor={rankColor}
									skWidth={ESize.xl}
									skHeight={ESize['2xl']}
								>
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
						<BMProgressBar label='Reliability' value={reliability} loading={loading} />
					</Column>

					<Spacing size={ESize.unset} smSize={ESize.m} />

					<BMButton fullWidth={isSmallerThanSm} secondary size={ESize.s} loading={loading} skWidth={120} skHeight={50}>
						Show More
					</BMButton>
				</Flex>
			</Flex>

			{!loading && !emptyItem && <ItemLink href={linkTo} internal ariaLabel={`Go to ${name} page`} />}
		</BMCardContainer>
	);
};

export { BlockchainCard };
