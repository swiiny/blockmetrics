import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { ISingleBlockchainPage } from './SingleBlockchainPage.type';
import { getBlockchainAndMetadataById } from '../../../../utils/fetch';
import { useRouter } from 'next/router';
import { BLOCKCHAINS_ARRAY } from '../../../../utils/variables';
import { EFlex, ELanguage, ESize, ETextColor } from '../../../../styles/theme/utils/enum';
import Column from '../../../../styles/layout/Column';
import Text from '../../../../styles/theme/components/Text';
import Flex from '../../../../styles/layout/Flex';
import { DataText } from '../../../texts/DataText/DataText';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

let ws: W3CWebSocket | null;
let wsTimeout: NodeJS.Timeout | null;

const SingleBlockchainPage: NextPage<ISingleBlockchainPage> = () => {
	const [blockchain, setBlockchain] = useState<TBlockchain>();
	const [metadata, setMetadata] = useState<TBlockchainMetadata>();
	const [wsConnected, setWsConnected] = useState<boolean>(false);
	const [wsAlreaddyConnected, setWsAlreadyConnected] = useState<boolean>(false);

	const { query } = useRouter();
	const { name } = query;

	const initData = useCallback(async () => {
		const blockchainId = BLOCKCHAINS_ARRAY.find((bc) => bc.name.toLowerCase().replace(/\s/g, '-') === name)?.id;

		const result = await getBlockchainAndMetadataById(blockchainId || '', ELanguage.en);

		const { blockchain: fetchedBlockchain, metadata: fetchMetadata } = result || {};

		setBlockchain(fetchedBlockchain);
		setMetadata(fetchMetadata);
	}, [name]);

	const initWebsocket = useCallback(() => {
		if (ws) {
			ws.close();
			ws = null;
		}

		let type;
		let strToRemove;

		if (process.env.NODE_ENV === 'production') {
			type = 'wss';
			strToRemove = 'https://';
		} else {
			type = 'ws';
			strToRemove = 'http://';
		}

		const removed = process.env.WS_URL?.replace(strToRemove, '');
		ws = new W3CWebSocket(`${type}://${removed}/`);

		ws.onopen = () => {
			setWsAlreadyConnected(true);
			setWsConnected(true);
		};

		ws.onmessage = (e: any) => {
			const res = JSON.parse(e.data);

			if (res?.length) {
				const newBlockchain = res.find((bc: TBlockchain) => bc.id === blockchain?.id);

				if (newBlockchain) {
					setBlockchain(newBlockchain);
				}
			}
		};

		ws.onerror = (e: any) => {
			console.error('socket error', e);
		};

		ws.onclose = () => {
			setWsConnected(false);
		};
	}, [blockchain]);

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
			result.push({
				value: hashrate,
				unit: 'TH/s',
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

	useEffect(() => {
		initData();
	}, [name]);

	useEffect(() => {
		if (blockchain?.id && !wsAlreaddyConnected) {
		}
	}, [blockchain, wsAlreaddyConnected]);

	useEffect(() => {
		if (!wsConnected) {
			wsTimeout = setTimeout(() => {
				initWebsocket();
			}, 5000);
		} else if (wsTimeout) {
			clearTimeout(wsTimeout);
		}
	}, [wsConnected]);

	useEffect(() => {
		return () => ws?.close();
	}, []);

	return (
		<>
			<Meta title={blockchain?.name || ''} />

			<Header
				title={blockchain?.name || ''}
				subtitle={metadata?.tagline || ''}
				image={`/assets/images/blockchains/${blockchain?.id}.svg`}
			/>

			<Main paddingTop={ESize.unset} noMarginTop>
				<Column columns={8} md={12} lg={8}>
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
					<Text textColor={ETextColor.light}>{metadata?.description || ''}</Text>
				</Column>
			</Main>
		</>
	);
};

export { SingleBlockchainPage };
