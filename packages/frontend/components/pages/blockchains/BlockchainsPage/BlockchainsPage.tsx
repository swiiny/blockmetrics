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
	subtitle: 'Here you can find 6 of the most importants blockchains and a preview of their data'
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
			<Meta
				title='Blockchains'
				description='Overview of all listed blockchains. For each blockchain you can get the Blockmetrics rank, the power consumption, the gas price, the token count and the reliability index. Select one of them to get more informations.'
			/>

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main>
				<StyledBlockchainList>
					{blockchains.length ? (
						<>
							{blockchains.map((blockchain: TBlockchain) => (
								<BlockchainCard key={blockchain.id} data={blockchain} />
							))}

							{Array.from({ length: 4 }).map((_, i) => (
								<BlockchainCard key={'empty-bc-card-' + i} emptyItem />
							))}
						</>
					) : (
						Array.from({ length: 3 }).map((_, i) => <BlockchainCard key={'skeleton-bc-card-' + i} loading />)
					)}
				</StyledBlockchainList>
			</Main>
		</>
	);
};

export { BlockchainsPage };
