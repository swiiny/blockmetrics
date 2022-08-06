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
		items: [
			{
				label: 'A distributed database shared between all nodes of a computer network'
			},
			{
				label:
					'The data are stored in blocks. Each blockchain has different block size and different block time. The block size is how many information you can store in and the block time is the time between two blocks'
			},
			{
				label:
					'A block can’t be edited. Each new block is secured with the hash from the previous one which mean that if you edit an old block then all the follow’s one are getting invalid. That’s why blockchain are unfakable and safe. If > 50% of validators agreed that a block is true then it become the truth. '
			},
			{
				label:
					'More there are different validators more a blockchain is reliable, the right term for it is decentralized. It’s more secure to get a big amount of valdiators to prevent 51% attack. As an example if 51% (>50%) of validators can organized themself to validate blocks with fake data then it’s not reliable. More there are validators, more it is diffcult to organize this kind of thing.'
			},
			{
				label: 'Read more about blockchains at the following links:',
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
			'The Blockmetrics ranking is calculated according to our own chriteria of what make a blockchain a good one. If you don’t agree with us feel free to create a github issue with your args so we will be able to improve our ranking quality. Some metrics are not used to calculate score because we have to used metrics in common for each blockchain.',
		items: [
			{
				label: 'Power consumption',
				highlightedValue: `${Math.floor((10 / totalWeight) * 100)}%`,
				subitems: [
					{
						value:
							'Calculated using logarithm function from 0 to the value of the blockchain with the highest daily power consumption'
					}
				]
			},
			{
				label: 'Proof of trust',
				highlightedValue: `${Math.floor((6 / totalWeight) * 100)}%`,
				subitems: [
					{
						value:
							'This index is used to know how a blockchain is working well and can be used safely. We calculate this score using the maturity and the TVL. The older a blockcahin is and its total value locked is high then the higher this score will be'
					}
				]
			},
			{
				label: 'Reliability',
				highlightedValue: `${Math.floor((5 / totalWeight) * 100)}%`,
				subitems: [
					{
						value: 'We assume that a blockchain is full reliable from 2000 nodes'
					},
					{
						value:
							'The more nodes a blockchain has, the more reliable it is considered because the more decentralized it is. Decentralization is important to ensure that a group of people cannot agree to take fraudulent actions'
					}
				]
			},
			{
				label: 'Token count',
				highlightedValue: `${Math.floor((3 / totalWeight) * 100)}%`,
				subitems: [
					{
						value:
							'Calculated using logarithm function from 0 to the value of the blockchain with the highest token count.'
					},
					{
						value: 'We assume that the more token there is, the more likely the blockchain will be used by users'
					}
				]
			},
			{
				label: 'Last month transaction per seconds',
				highlightedValue: `${Math.floor((1 / totalWeight) * 100)}%`,
				subitems: [
					{
						value: 'This index is used to evaluate which is the most used blockchain'
					},
					{
						value:
							'The weight of this index is small because increase the rank a blockchain because of how much it’s used can unbalanced other more important in term of technical and reliablity indexes. It’s taking in count because if a blockchain is used a lot then we assume that it has great things to offer to its users'
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
