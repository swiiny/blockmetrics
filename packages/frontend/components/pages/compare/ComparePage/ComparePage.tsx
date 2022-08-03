import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import CompareSelector from '../CompareSelector';
import useWebsocket from '../../../../hooks/useWebsocket';
import { ESize, ESubscribeType } from '../../../../styles/theme/utils/enum';
import Spacing from '../../../../styles/layout/Spacing';
import { CompareBlockchains } from '../CompareBlockchains/CompareBlockchains';
import { BLOCKCHAINS_ICONS } from '../../../../utils/variables';
import { TBlockchain } from '../../../../types/blockchain';

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
		if (message?.channel === ESubscribeType.blockchains) {
			setBlockchains(
				message.data.map((data: TBlockchain) => ({
					...data,
					isSelected: selectedBlockchainIds.includes(data.id),
					icon: BLOCKCHAINS_ICONS[data.id as keyof typeof BLOCKCHAINS_ICONS]
				}))
			);
		}
	}, [message, selectedBlockchainIds]);

	useEffect(() => {
		subscribeTo(ESubscribeType.blockchains);
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

				<Spacing size={ESize.l} />

				<CompareBlockchains blockchains={blockchains.filter(({ isSelected }) => isSelected)} />
			</Main>
		</>
	);
};

export { ComparePage };
