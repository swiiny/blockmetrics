import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { ISingleBlockchainPage } from './SingleBlockchainPage.type';
import { useRouter } from 'next/router';
import { BLOCKCHAINS_ARRAY } from '../../../../utils/variables';
import { EChartType, EDailyData, EIcon, ESize, ESubscribeType } from '../../../../styles/theme/utils/enum';
import { DataCard } from '../../../texts/DataCard/DataCard';
import Spacing from '../../../../styles/layout/Spacing';
import useWebsocket from '../../../../hooks/useWebsocket';
import { getEIconTypeFromValue, getESubscribeTypeFromValue } from '../../../../styles/theme/utils/functions';
import { IDataCard } from '../../../texts/DataCard/DataCard.type';
import { StyledList } from './SingleBlockchainPage.styles';
import { getEngNotation } from '../../../../utils/convert';
import InformationCard from '../InformationCard';
import BlockchainData from '../BlockchainData';

const SingleBlockchainPage: NextPage<ISingleBlockchainPage> = () => {
	const [blockchain, setBlockchain] = useState<TBlockchain>();
	const [blockchainChannel, setBlockchainChannel] = useState<ESubscribeType>();
	const [tagline, setTagline] = useState<string>('');

	const { subscribeTo, message, wsConnected } = useWebsocket();

	const { query } = useRouter();
	const { name } = query;

	const selectedData = useMemo<IDataCard[]>(() => {
		const result = [];

		const { gas_price, token_count, hashrate, last_block_timestamp, blockchain_power_consumption } = blockchain || {};

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
			const { value, unit, hasDecimals } = getEngNotation(blockchain_power_consumption, 'Wh');

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

		if (last_block_timestamp) {
			result.push({
				value: last_block_timestamp,
				unit: 's',
				isTimer: true,
				label: 'Time from last block',
				icon: EIcon.timer,
				colorAnimationOnUpdate: true,
				reverseColor: true
			});
		}

		if (hashrate) {
			const { value, unit, hasDecimals } = getEngNotation(hashrate * 10 ** 12, 'H/s');

			result.push({
				value: value,
				unit: unit,
				isAnimated: true,
				valueHasDecimals: hasDecimals,
				label: 'Hashrate',
				icon: EIcon.chart,
				colorAnimationOnUpdate: true
			});
		}

		return result.slice(0, 4);
	}, [blockchain]);

	const chainLogo = useMemo<EIcon>(() => {
		if (blockchain?.id) {
			return getEIconTypeFromValue(blockchain?.id);
		}

		return EIcon.none;
	}, [blockchain?.id]);

	const initData = useCallback(async () => {
		const blockchainId = BLOCKCHAINS_ARRAY.find((bc) => bc.name.toLowerCase().replace(/\s/g, '-') === name)?.id;

		if (blockchainId) {
			setBlockchainChannel(getESubscribeTypeFromValue(blockchainId));
		}
	}, [name]);

	useEffect(() => {
		if (blockchainChannel && message?.channel === blockchainChannel) {
			setBlockchain(message?.data);
		}
	}, [message, blockchainChannel]);

	useEffect(() => {
		if (wsConnected && blockchainChannel) {
			subscribeTo(blockchainChannel);
		}
	}, [wsConnected, blockchainChannel]);

	useEffect(() => {
		name && initData();
	}, [name, initData]);

	return (
		<>
			<Meta title={blockchain?.name || ''} />

			<Header title={blockchain?.name || ''} subtitle={tagline} icon={chainLogo} />

			<Main paddingTop={ESize.unset} noMarginTop>
				<StyledList>
					{selectedData.map((data: IDataCard, i: number) => (
						<DataCard key={data.label} as='li' index={i + 1} {...data} />
					))}
				</StyledList>

				<Spacing size={ESize.xl} />

				{selectedData.length > 0 ? (
					<InformationCard chainId={blockchain?.id} onGetTagline={(tagline) => setTagline(tagline)} />
				) : (
					<></>
				)}

				<Spacing size={ESize.xl} />

				<BlockchainData chainId={blockchain?.id} />
			</Main>
		</>
	);
};

export { SingleBlockchainPage };
