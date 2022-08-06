import { NextPage } from 'next';
import React, { FC } from 'react';
import Main from '../../../../styles/layout/Main';
import { ESize } from '../../../../styles/theme/utils/enum';
import Header from '../../../Header';
import Meta from '../../../utils/Meta';
import DocumentationCard from '../DocumentationCard';

const HeaderData = {
	title: 'Documentation',
	subtitle: 'How the platform works and lexicon of terms'
};

const totalWeight = 25;

const cards = [
	{
		title: 'What is a blockchain?',
		maxHeight: '400px',
		items: [
			{
				label: 'A distributed database shared between all nodes of a computer network'
			},
			{
				label:
					'Data is stored in blocks. Each blockchain has a different block size and block time. The block size is the number of information you can store in and the block time is the time between two blocks'
			},
			{
				label:
					'A block cannot be modified. Each new block is secured with the hash of the previous one, which means that if you modify an old block, all those created after it will become invalid. This is why blockchain are durable and safe. If > 50% of validators have agreed that a block is true, then it becomes the truth.'
			},
			{
				label:
					'The more different validators there are, the more reliable a blockchain is, it is said to be decentralized. It is safer for users to use a blockchain with a large amount of validators. For example, if 51% (>50%) of validators can easily arrange to validate blocks with false data, then we cannot trust the blockchain completely. the more validators there are, the more difficult it is for validators to be organized, with a sufficient number of validators, it becomes impossible'
			},
			{
				label: 'To learn more about blockchain, see the following link',
				subitems: [
					{
						value: 'https://www.investopedia.com/terms/b/blockchain.asp',
						isLink: true
					}
				]
			}
		]
	},
	{
		title: 'How the ranking is defined?',
		subtitle:
			'The Blockmetrics ranking is calculated according to our own criteria that define what makes a good blockchain. If you do not agree with us, do not hesitate to create a github issue with your arguments so that we can improve our ranking quality. Some metrics are not used to calculate the score because we have to use metrics that we have in common for each blockchain.',
		items: [
			{
				label: 'Power consumption',
				highlightedValue: `${Math.floor((10 / totalWeight) * 100)}%`,
				subitems: [
					{
						value:
							'Calculated using the logarithmic function from 0 to the value of the blockchain with the highest daily power consumption'
					}
				]
			},
			{
				label: 'Proof of trust',
				highlightedValue: `${Math.floor((6 / totalWeight) * 100)}%`,
				subitems: [
					{
						value:
							'This index is used to know how a blockchain works well and can be used safely. We calculate this score using maturity and TVL. The older a blockcahin is and its total value locked is high, the higher this score will be'
					}
				]
			},
			{
				label: 'Reliability',
				highlightedValue: `${Math.floor((5 / totalWeight) * 100)}%`,
				subitems: [
					{
						value: 'We assume that a blockchain is fully reliable from 2000 nodes'
					},
					{
						value:
							'The more nodes in a blockchain, the more reliable it is, because the more decentralized it is. Decentralization is important to ensure that a group of people cannot agree and accept fraudulent transactions'
					}
				]
			},
			{
				label: 'Token count',
				highlightedValue: `${Math.floor((3 / totalWeight) * 100)}%`,
				subitems: [
					{
						value:
							'Calculated using the logarithmic function from 0 to the value of the blockchain with the highest token count'
					},
					{
						value: 'We assume that the more tokens there are, the more the blockchain will be used by users'
					}
				]
			},
			{
				label: 'Last month transaction per seconds',
				highlightedValue: `${Math.floor((1 / totalWeight) * 100)}%`,
				subitems: [
					{
						value: 'This index is used to evaluate which blockchain is the most used'
					},
					{
						value:
							'The weight of this index is low because increasing the rank of a blockchain because of how much it is used can create an imbalance with other important technical and confidence properties. This parameter is still taken into account because if there are many users it is because the blockchain has beautiful things to offer its users'
					}
				]
			}
		]
	}
];

const DocumentationPage: NextPage = () => {
	return (
		<>
			<Meta title={HeaderData.title} />

			<Header title={HeaderData.title} subtitle={HeaderData.subtitle} />

			<Main paddingTop={ESize.unset} noMarginTop>
				{cards.map((card) => (
					<DocumentationCard key={card.title} {...card} />
				))}
			</Main>
		</>
	);
};

export { DocumentationPage };
