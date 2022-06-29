import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import BlockchainCard from '../../../cards/BlockchainCard';
import { StyledBlockchainList } from './BlockchainsPage.styles';
import { axiosRest } from '../../../../utils/variables';

const HeaderData = {
	title: 'Blockchains',
	subtitle: 'Here you can find the 10 most importants blockchains and a preview of their data'
};

const BlockchainsPage: NextPage = () => {
	const [loading, setLoading] = useState(true);
	const [wsConnected, setWsConnected] = useState(false);
	const [blockchains, setBlockchains] = useState([]);

	let ws: W3CWebSocket;

	const initWebsocket = async () => {
		if (ws) {
			ws.close();
		}

		setLoading(true);
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
			setLoading(false);
			setWsConnected(true);
		};

		ws.onmessage = (e: any) => {
			const res = JSON.parse(e.data);

			if (res?.length) {
				setBlockchains(res);
			}
		};

		ws.onerror = (e: any) => {
			console.error('socket error', e);
		};

		ws.onclose = () => {
			setWsConnected(false);
		};
	};

	const refresh = (isActivated: boolean) => {
		if (!isActivated) {
			initWebsocket();
		}
	};

	const fetchData = async () => {
		try {
			const res = await axiosRest('/get/blockchains');
			setBlockchains(res.data);
			initWebsocket();
		} catch (err) {
			console.error('fetchData', err);
		}
	};

	useEffect(() => {
		fetchData();

		return () => {
			if (ws) {
				ws.close();
			}
		};
	}, []);

	return (
		<>
			<Meta title='Blockchains' />

			<Header
				title={HeaderData.title}
				subtitle={HeaderData.subtitle}
				refreshAction={!wsConnected ? () => refresh(wsConnected) : undefined}
			/>

			<Main>
				<StyledBlockchainList>
					{blockchains.map((blockchain: TBlockchain) => (
						<BlockchainCard key={blockchain.id} data={blockchain} />
					))}

					{Array.from({ length: 4 }).map((_, i) => (
						<BlockchainCard key={'empty-bc-card-' + i} emptyItem />
					))}
				</StyledBlockchainList>
			</Main>
		</>
	);
};

export { BlockchainsPage };
