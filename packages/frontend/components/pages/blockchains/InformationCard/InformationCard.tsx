import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMExternalLink from '../../../../styles/theme/components/BMExternalLink';
import BMGradientSeparator from '../../../../styles/theme/components/BMGradientSeparator';
import BMListItem from '../../../../styles/theme/components/BMListItem';
import BMProgressBar from '../../../../styles/theme/components/BMProgressBar';
import BMText from '../../../../styles/theme/components/BMText';
import {
	EFlex,
	ELanguage,
	EPosition,
	ESize,
	ETextColor,
	ETextType,
	ETextWeight
} from '../../../../styles/theme/utils/enum';
import { TBlockchainMetadata } from '../../../../types/blockchain';
import { getBlockchainMetadataAndScoreById } from '../../../../utils/fetch';
import Eclipse from '../../../utils/Eclipse';
import { StyledList, StyledRank, StyledUsefulLinkList } from './InformationCard.styles';
import { IInformationCard } from './InformationCard.type';

const InformationCard: FC<IInformationCard> = ({ chainId = '', onGetTagline = () => {}, ...otherProps }) => {
	const { isSmallerThanMd, isSmallerThanLg } = useResponsive();

	const [metadata, setMetadata] = useState<TBlockchainMetadata>({
		tagline: '',
		description: '',
		genesis_block: '',
		source: '',
		links: ''
	});

	const [score, setScore] = useState<{
		id: string;
		rank: string;
		score: number;
		reliability: number;
		token_count: number;
		power_consumption: number;
		total_value_locked: number;
		speed: number;
	}>({
		id: '',
		rank: '',
		score: 0,
		reliability: 0,
		token_count: 0,
		power_consumption: 0,
		total_value_locked: 0,
		speed: 0
	});

	const genesisBlockDate = useMemo(() => {
		const { genesis_block } = metadata;
		if (!genesis_block) {
			return '';
		}

		// convert to long local date
		const date = new Date(genesis_block);
		const dateString = date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		});

		return dateString;
	}, [metadata]);

	const rankingDetails = useMemo(() => {
		const items: { label: string; value: number }[] = [];

		items.push({
			label: 'Tokens count',
			value: score.token_count
		});

		items.push({
			label: 'Reliability',
			value: score.reliability
		});

		items.push({
			label: 'Power Consumption',
			value: score.power_consumption
		});

		items.push({
			//label: 'Speed', // @todo(change value saved in speed column in the database)
			label: 'Community index',
			value: score.speed
		});

		return items.map((item) => (
			<BMListItem key={item.label} dotHidden>
				<BMProgressBar size={isSmallerThanMd ? ESize.s : ESize.m} {...item} />
			</BMListItem>
		));
	}, [score, isSmallerThanMd]);

	const formattedLinks = useMemo(() => {
		try {
			const { links } = metadata;
			if (!links) {
				return <></>;
			}

			const results = links.split(',');

			return (
				<StyledUsefulLinkList>
					{results.map((link) => (
						<li key={link}>
							<BMExternalLink href={link} size={ESize.m} weight={ETextWeight.thin} />
						</li>
					))}
				</StyledUsefulLinkList>
			);
		} catch {
			return <></>;
		}
	}, [metadata]);

	const initData = useCallback(async () => {
		if (chainId) {
			const result = await getBlockchainMetadataAndScoreById(chainId || '', ELanguage.en);

			const { metadata: newMetadata, score: newScore } = result || {};

			if (newMetadata) {
				setMetadata(newMetadata);
				newMetadata.tagline && onGetTagline(newMetadata.tagline);
			}

			if (newScore) {
				setScore(newScore);
			}
		}
	}, [chainId, onGetTagline]);

	const rankContainer = useMemo(() => {
		const { rank } = score;
		const positive = ['A+', 'A', 'A-', 'B+', 'B', 'B-'];
		const negative = ['C+', 'C', 'C-', 'D+', 'D', 'D-', 'E+', 'E', 'E-', 'F+', 'F', 'F-'];

		// set rank color
		let color = ETextColor.default;
		if (positive.includes(rank)) {
			color = ETextColor.positive;
		} else if (negative.includes(rank)) {
			color = ETextColor.negative;
		}

		return (
			<StyledRank>
				<BMText size={isSmallerThanMd ? ESize['2xl'] : ESize['4xl']} textColor={color} weight={ETextWeight.bold}>
					{rank}
				</BMText>
			</StyledRank>
		);
	}, [score, isSmallerThanMd]);

	useEffect(() => {
		!metadata.tagline && chainId && initData();
	}, [initData, chainId, metadata]);

	return (
		<BMCardContainer isHighlighted animateApparition={4} {...otherProps}>
			{!isSmallerThanLg && rankContainer}

			<Flex fullWidth wrapItems padding={ESize['2xl']} mdPadding={ESize.l} smPaddingX={ESize.s}>
				<Column columns={5} lg={12}>
					<BMText as='h3' weight={ETextWeight.semiBold} size={ESize['2xl']}>
						Informations
					</BMText>

					<StyledList marginTop={ESize.xl}>
						<BMListItem>
							<BMText size={ESize.m} weight={ETextWeight.light}>
								Genesis block date:
								<BMText type={ETextType.span} weight={ETextWeight.normal} textColor={ETextColor.positive}>
									{` ${genesisBlockDate}`}
								</BMText>
							</BMText>
						</BMListItem>

						<BMListItem>
							<BMText size={ESize.m} weight={ETextWeight.light}>
								{metadata.description}
								<br />
								<br />
								<BMExternalLink href={metadata.source} size={ESize.m} weight={ETextWeight.thin} />
							</BMText>
						</BMListItem>

						{metadata?.links?.length ? (
							<BMListItem>
								<Flex direction={EFlex.column}>
									<BMText size={ESize.m} weight={ETextWeight.light}>
										Useful links
									</BMText>
									{formattedLinks}
								</Flex>
							</BMListItem>
						) : (
							<></>
						)}
					</StyledList>
				</Column>

				<Column columns={1} lg={0} />

				{isSmallerThanLg ? <BMGradientSeparator margin={ESize.xl} /> : <></>}

				<Column columns={5} lg={12}>
					<Eclipse size={ESize.xs} position={EPosition.center} />

					<Flex horizontal={EFlex.between} vertical={EFlex.center}>
						<BMText as='h3' weight={ETextWeight.semiBold} size={ESize['2xl']}>
							Blockmetrics Ranking
						</BMText>

						{isSmallerThanLg && rankContainer}
					</Flex>

					<StyledList marginTop={ESize.xl}>
						<BMListItem dotHidden>
							<BMText size={ESize.m} weight={ETextWeight.light}>
								Blockmetrics give a rank from D- to A+, D- being the worst and A+ the best, to blockchains depending on
								some caracteristics. Mainly the four below.
								<br />
								{/* @todo(add link ti the calculation details page) */}
								See more about the ranking calculation here
							</BMText>
						</BMListItem>

						{rankingDetails}
					</StyledList>
				</Column>
			</Flex>
		</BMCardContainer>
	);
};

export { InformationCard };
