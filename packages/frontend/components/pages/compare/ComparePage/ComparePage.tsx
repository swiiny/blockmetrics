import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import Flex from '../../../../styles/layout/Flex';
import CompareSelector from '../CompareSelector';
import useWebsocket from '../../../../hooks/useWebsocket';
import { ESubscribeType } from '../../../../styles/theme/utils/enum';
import { BLOCKCHAINS_ARRAY } from '../../../../utils/variables';
import { getEIconTypeFromValue } from '../../../../styles/theme/utils/functions';

const HeaderData = {
	title: 'Compare',
	titleSemiBold: 'Blockchains',
	subtitle:
		'You can compare the blockchains with each other according to several parameters such as reliability, power consumption, number of tokens and many other things'
};

const ComparePage: NextPage = () => {
	const { subscribeTo, message } = useWebsocket();
	const [blockchains, setBlockchains] = useState<TBlockchain[]>([]);
	const [selectedBlockchainIds, setSelectedBlockchainIds] = useState<string[]>([]);

	const onSelectBlockchain = useCallback(
		(id: string | null) => {
			if (!id) {
				setSelectedBlockchainIds([]);
				return;
			}

			// remove or add blockchainId from selectedBlockchainIds
			if (selectedBlockchainIds.includes(id)) {
				setSelectedBlockchainIds(selectedBlockchainIds.filter((blockchainId) => blockchainId !== id));
				return;
			}

			setSelectedBlockchainIds([...selectedBlockchainIds, id]);
		},
		[selectedBlockchainIds]
	);

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
			<Meta title={HeaderData.title} />

			<Header {...HeaderData} />

			<Main>
				<CompareSelector
					blockchains={blockchains}
					onSelectBlockchain={(id) => onSelectBlockchain(id)}
					selectedBlockchainIds={selectedBlockchainIds}
				/>
			</Main>
		</>
	);
};

export { ComparePage };
