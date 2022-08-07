import React, { useCallback, useEffect, useReducer, useState } from 'react';
import type { NextPage } from 'next';
import Meta from '../../../utils/Meta';
import Header from '../../../Header';
import Main from '../../../../styles/layout/Main';
import CompareSelector from '../CompareSelector';
import useWebsocket from '../../../../hooks/useWebsocket';
import { ESize, ESubscribeType } from '../../../../styles/theme/utils/enum';
import Spacing from '../../../../styles/layout/Spacing';
import { CompareBlockchains } from '../CompareBlockchains/CompareBlockchains';
import { BLOCKCHAINS_ARRAY, BLOCKCHAINS_ICONS, BLOCKCHAINS_IDS_ARRAY } from '../../../../utils/variables';
import { TBlockchain } from '../../../../types/blockchain';

const HeaderData = {
	title: 'Compare',
	titleSemiBold: 'Blockchains',
	subtitle:
		'You can compare the blockchains with each other according to several parameters such as reliability, power consumption, number of tokens and many other things'
};

const ComparePage: NextPage = () => {
	const { subscribeTo, message } = useWebsocket();
	const [loading, stopLoading] = useReducer(() => false, true);

	const [blockchains, setBlockchains] = useState<TBlockchain[]>(
		BLOCKCHAINS_ARRAY.map((bc) => ({
			id: bc.id,
			name: bc.name,
			icon: bc.icon,
			isSelected: true,
			loading: true
		})) as TBlockchain[]
	);

	const [selectedBlockchainIds, setSelectedBlockchainIds] = useState<string[]>(
		BLOCKCHAINS_ARRAY.map((blockchain) => blockchain.id)
	);

	const onSelectBlockchain = useCallback(
		(id: string | null) => {
			if (!id) {
				setSelectedBlockchainIds([]);
				return;
			}

			if (id === 'all') {
				setSelectedBlockchainIds(BLOCKCHAINS_IDS_ARRAY);
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
			loading && stopLoading();

			setBlockchains(
				message.data.map((data: TBlockchain) => ({
					...data,
					isSelected: selectedBlockchainIds.includes(data.id),
					loading: false,
					icon: BLOCKCHAINS_ICONS[data.id as keyof typeof BLOCKCHAINS_ICONS]
				}))
			);
		}
	}, [loading, message, selectedBlockchainIds]);

	useEffect(() => {
		subscribeTo(ESubscribeType.blockchains);
	}, [subscribeTo]);

	return (
		<>
			<Meta title={HeaderData.title + ' ' + HeaderData.titleSemiBold} description={HeaderData.subtitle} />

			<Header {...HeaderData} />

			<Main>
				<CompareSelector
					blockchains={blockchains}
					onSelectBlockchain={(id) => onSelectBlockchain(id)}
					selectedBlockchainIds={selectedBlockchainIds}
					loading={loading}
				/>

				<Spacing size={ESize.l} />

				<CompareBlockchains blockchains={blockchains.filter(({ isSelected }: TBlockchain) => isSelected)} />
			</Main>
		</>
	);
};

export { ComparePage };
