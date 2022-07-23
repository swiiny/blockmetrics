import Link from 'next/link';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMExternalLink from '../../../../styles/theme/components/BMExternalLink';
import BMListItem from '../../../../styles/theme/components/BMListItem';
import BMText from '../../../../styles/theme/components/BMText';
import { ELanguage, ESize, ETextColor, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';
import { getBlockchainMetadataById } from '../../../../utils/fetch';
import { StyledList } from './InformationCard.styles';
import { IInformationCard } from './InformationCard.type';

const InformationCard: FC<IInformationCard> = ({ chainId = '', onGetTagline = () => {}, ...otherProps }) => {
	const [metadata, setMetadata] = useState<TBlockchainMetadata>({
		tagline: '',
		description: '',
		genesis_block: '',
		source: '',
		links: []
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
	}, [metadata.genesis_block]);

	const initData = useCallback(async () => {
		if (chainId) {
			const result = await getBlockchainMetadataById(chainId || '', ELanguage.en);

			if (result) {
				setMetadata(result);
				result.tagline && onGetTagline(result.tagline);
			}
		}
	}, [chainId]);

	useEffect(() => {
		!metadata.tagline && chainId && initData();
	}, [initData, chainId, metadata]);

	return (
		<BMCardContainer isHighlighted {...otherProps}>
			<Flex fullWidth padding={ESize['2xl']}>
				<Column columns={6}>
					<BMText as='h3' singleLine weight={ETextWeight.semiBold} size={ESize['2xl']}>
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
								<Link href={metadata.source} passHref>
									<BMExternalLink href={metadata.source} size={ESize.m} weight={ETextWeight.thin} />
								</Link>
							</BMText>
						</BMListItem>
					</StyledList>
				</Column>

				<Column columns={6}></Column>
			</Flex>
		</BMCardContainer>
	);
};

export { InformationCard };
