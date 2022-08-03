import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import BlockchainCard from '../../../cards/BlockchainCard';
import { StyledBlockchainList } from './BlockchainsPage.styles';
import useWebsocket from '../../../../hooks/useWebsocket';
import { ESubscribeType } from '../../../../styles/theme/utils/enum';
import { TBlockchain } from '../../../../types/blockchain';

const HeaderData = {
	title: 'Blockchains',
	subtitle: 'Here you can find the 10 most importants blockchains and a preview of their data'
};

const BlockchainsPage: NextPage = () => {
	const { subscribeTo, message } = useWebsocket();
	const [blockchains, setBlockchains] = useState([]);

	useEffect(() => {
		if (message?.channel === ESubscribeType.blockchainCards) {
			setBlockchains(message.data);
		}
	}, [message]);

	useEffect(() => {
		subscribeTo(ESubscribeType.blockchainCards);
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
