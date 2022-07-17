import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { ISingleBlockchainPage } from './SingleBlockchainPage.type';
import { getBlockchainAndMetadataById } from '../../../../utils/fetch';
import { useRouter } from 'next/router';
import { BLOCKCHAINS_ARRAY } from '../../../../utils/variables';
import {
	EChartType,
	EDailyData,
	EFlex,
	ELanguage,
	ESize,
	ESubscribeType,
	ETextColor
} from '../../../../styles/theme/utils/enum';
import Column from '../../../../styles/layout/Column';
import BMText from '../../../../styles/theme/components/BMText';
import Flex from '../../../../styles/layout/Flex';
import { DataText } from '../../../texts/DataText/DataText';
import Spacing from '../../../../styles/layout/Spacing';
import BarChart from '../../../charts/BarChart';
import { IBarLineChart } from '../../../../types/charts';
import useWebsocket from '../../../../hooks/useWebsocket';
import { getESubscribeTypeFromValue } from '../../../../styles/theme/utils/functions';

const SingleBlockchainPage: NextPage<ISingleBlockchainPage> = () => {
	const [blockchain, setBlockchain] = useState<TBlockchain>();
	const [blockchainChannel, setBlockchainChannel] = useState<ESubscribeType>();

	const [metadata, setMetadata] = useState<TBlockchainMetadata>();
	const { subscribeTo, message, wsConnected } = useWebsocket();

	const { query } = useRouter();
	const { name } = query;

	const selectedData = useMemo(() => {
		const result = [];

		const { gas_price, token_count, hashrate, last_block_timestamp } = blockchain || {};

		if (gas_price) {
			result.push({
				value: Math.floor(gas_price * 10 ** -9),
				unit: 'Gwei',
				isAnimated: true,
				label: 'Gas Price'
			});
		}

		if (token_count) {
			result.push({
				value: token_count,
				isAnimated: true,
				label: 'Tokens'
			});
		}

		if (hashrate) {
			let tempHashrate = hashrate;
			let tempUnit = 'TH/s';

			if (Math.floor(tempHashrate) > 1000000) {
				tempHashrate = Math.floor(tempHashrate * 10 ** -3);
				tempUnit = 'PH/s';
			}

			result.push({
				value: tempHashrate,
				unit: tempUnit,
				isAnimated: true,
				label: 'Hashrate'
			});
		}

		if (last_block_timestamp) {
			result.push({
				value: last_block_timestamp,
				unit: 's',
				isTimer: true,
				label: 'Time from last block'
			});
		}

		return result;
	}, [blockchain]);

	const chartsToDisplay: IBarLineChart[] = useMemo(() => {
		const result: IBarLineChart[] = [];

		// TODO : select charts to display
		result.push({
			chartType: EChartType.bar,
			dailyType: EDailyData.averageBlocktime,
			chainId: blockchain?.id || ''
		});

		return result;
	}, [blockchain]);

	const initData = useCallback(async () => {
		const blockchainId = BLOCKCHAINS_ARRAY.find((bc) => bc.name.toLowerCase().replace(/\s/g, '-') === name)?.id;

		if (blockchainId) {
			setBlockchainChannel(getESubscribeTypeFromValue(blockchainId));
			// @todo(fetch only metadata because ws send first value without pause)
			const result = await getBlockchainAndMetadataById(blockchainId || '', ELanguage.en);
			const { blockchain: fetchedBlockchain, metadata: fetchMetadata } = result || {};

			setMetadata(fetchMetadata);
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

			<Header
				title={blockchain?.name || ''}
				subtitle={metadata?.tagline || ''}
				image={blockchain?.id ? `/assets/images/blockchains/${blockchain?.id}.svg` : undefined}
			/>

			<Main paddingTop={ESize.unset} noMarginTop>
				<Column columns={9} md={12} lg={8}>
					<Flex as='ul' horizontal={EFlex.between} wrapItems paddingY={ESize['3xl']}>
						{selectedData.map(({ value, label, unit, isAnimated, isTimer }) => (
							<DataText
								key={label}
								as='li'
								value={value}
								label={label}
								unit={unit}
								isAnimated={isAnimated}
								isTimer={isTimer}
							/>
						))}
					</Flex>
				</Column>

				<Column columns={6} md={12} lg={8}>
					<BMText textColor={ETextColor.light}>{metadata?.description || ''}</BMText>
				</Column>

				<Spacing size={ESize.xl} />

				<Flex as='ul' fullWidth horizontal={EFlex.between} wrapItems paddingY={ESize['3xl']}>
					{chartsToDisplay.map(({ chartType, dailyType, chainId }) => (
						<Column as='li' key={dailyType} columns={4}>
							{chartType === EChartType.bar ? <BarChart dailyType={dailyType} chainId={chainId} /> : <></>}
						</Column>
					))}
				</Flex>
			</Main>
		</>
	);
};

export { SingleBlockchainPage };
