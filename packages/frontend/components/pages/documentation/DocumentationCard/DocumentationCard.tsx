import React, { FC } from 'react';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMLink from '../../../../styles/theme/components/BMLink';
import BMListItem from '../../../../styles/theme/components/BMListItem';
import BMText from '../../../../styles/theme/components/BMText';
import { EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';
import { StyledList, StyledSubitemsList } from './DocumentationCard.styles';
import { IDocumentationCard } from './DocumentationCard.type';

const DocumentationCard: FC<IDocumentationCard> = ({ title, subtitle, items, maxHeight, ...otherProps }) => {
	return (
		<BMCardContainer isHighlighted animateApparition marginTop={ESize['4xl']} smMarginTop={ESize.xl} {...otherProps}>
			<Flex fullWidth direction={EFlex.column} padding={ESize['2xl']} mdPadding={ESize.l} smPaddingX={ESize.s}>
				<BMText as='h2' weight={ETextWeight.semiBold} size={ESize['2xl']}>
					{title}
				</BMText>

				{subtitle && (
					<>
						<Spacing size={ESize.s} />

						<Column columns={8} md={12}>
							<BMText as='h4' size={ESize.m} weight={ETextWeight.light}>
								{subtitle}
							</BMText>
						</Column>
					</>
				)}

				<StyledList marginTop={ESize.xl} maxHeight={maxHeight}>
					{items.map(({ label, highlightedValue, subitems }) => (
						<BMListItem key={label}>
							<BMText size={ESize.m} weight={ETextWeight.light}>
								{label}

								{highlightedValue && (
									<>
										<BMText
											type={ETextType.span}
											//size={ESize.m}
											weight={ETextWeight.semiBold}
											textColor={ETextColor.light}
										>
											{' - ' + highlightedValue}
										</BMText>
									</>
								)}
							</BMText>

							{subitems && (
								<>
									<StyledSubitemsList>
										{subitems.map(({ value, linkLabel, isLink }) => (
											<li key={value}>
												{isLink ? (
													<BMLink href={value} size={ESize.m} weight={ETextWeight.thin}>
														{linkLabel}
													</BMLink>
												) : (
													<BMText size={ESize.m} weight={ETextWeight.thin} style={{ display: 'inline' }}>
														{value}
													</BMText>
												)}
											</li>
										))}
									</StyledSubitemsList>
								</>
							)}
						</BMListItem>
					))}
				</StyledList>
			</Flex>
		</BMCardContainer>
	);
};

export { DocumentationCard };
