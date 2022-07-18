import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import BlockchainCard from '../../../cards/BlockchainCard';
import { StyledBlockchainList } from './BlockchainsPage.styles';
import { axiosRest } from '../../../../utils/variables';
import useWebsocket from '../../../../hooks/useWebsocket';
import BMButton from '../../../../styles/theme/components/BMButton';
import { ESize, ESubscribeType } from '../../../../styles/theme/utils/enum';
import Spacing from '../../../../styles/layout/Spacing';

const HeaderData = {
	title: 'Blockchains',
	subtitle: 'Here you can find the 10 most importants blockchains and a preview of their data'
};

const BlockchainsPage: NextPage = () => {
	const { subscribeTo, message } = useWebsocket();
	const [blockchains, setBlockchains] = useState([]);

	useEffect(() => {
		if (message?.channel === ESubscribeType.blockchains) {
			setBlockchains(message.data);
		}
	}, [message]);

	useEffect(() => {
		subscribeTo(ESubscribeType.blockchains);
	}, [subscribeTo]);

	return (
		<>
			<Meta title='Blockchains' />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

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
