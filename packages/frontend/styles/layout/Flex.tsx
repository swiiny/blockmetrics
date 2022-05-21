import React from "react";
import styled, { css } from "styled-components";
import { EFlex, EMediaQuery } from "../theme/utils/enums";
import { mq } from "../theme/utils/functions";

interface IFlex {
	children: React.ReactNode;
	fullWidth?: boolean;
	fullHeight?: boolean;
	wrapItems?: boolean;

	direction?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	horizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	vertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;

	smDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	mdDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	lgDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;
	xlDirection?: EFlex.row | EFlex.rowReverse | EFlex.column | EFlex.columnReverse;

	smHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	mdHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	lgHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	xlHorizontal?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;

	smVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	mdVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	lgVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
	xlVertical?: EFlex.start | EFlex.end | EFlex.between | EFlex.around | EFlex.center;
}

const StyledFlex = styled.div<IFlex>`
	display: flex;

	${(p) => (p.wrapItems ? "flex-wrap: wrap;" : "flex-wrap: nowrap;")}

	${(p) => {
		return css`
			${p.direction ? `flex-direction: ${p.direction};` : ""}
			${p.horizontal ? `justify-content: ${p.horizontal};` : ""}
			${p.vertical ? `align-items: ${p.vertical};` : ""}
			${p.fullWidth ? css`width: 100%;` : ""}
			${p.fullHeight ? css`height: 100%;` : ""}

			${p.smDirection || p.smHorizontal || p.smVertical ? mq(EMediaQuery.sm, `
				${p.smDirection ? `flex-direction: ${p.smDirection};` : ""}
				${p.smHorizontal ? `justify-content: ${p.smHorizontal};` : ""}
				${p.smVertical ? `align-items: ${p.smVertical};` : ""}
			`) : ""}

			${p.mdDirection || p.mdHorizontal || p.mdVertical ? mq(EMediaQuery.md, `
				${p.mdDirection ? `flex-direction: ${p.mdDirection};` : ""}
				${p.mdHorizontal ? `justify-content: ${p.mdHorizontal};` : ""}
				${p.mdVertical ? `align-items: ${p.mdVertical};` : ""}
			`) : "" }

			${p.lgDirection || p.lgHorizontal || p.lgVertical ? mq(EMediaQuery.lg, `
				${p.lgDirection ? `flex-direction: ${p.lgDirection};` : ""}
				${p.lgHorizontal ? `justify-content: ${p.lgHorizontal};` : ""}
				${p.lgVertical ? `align-items: ${p.lgVertical};` : ""}
			`) : ""}

			${p.xlDirection || p.xlHorizontal || p.xlVertical ? mq(EMediaQuery.xl, `
				${p.xlDirection ? `flex-direction: ${p.xlDirection};` : ""}
				${p.xlHorizontal ? `justify-content: ${p.xlHorizontal};` : ""}
				${p.xlVertical ? `align-items: ${p.xlVertical};` : ""}
			`) : ""}
		`;
	}}
`;

const Flex: React.FC<IFlex> = ({
	children,
	fullWidth = false,
	fullHeight = false,
	wrapItems = true,
	direction = EFlex.row,
	horizontal = EFlex.start,
	vertical = EFlex.start,
	smDirection,
	mdDirection,
	lgDirection,
	xlDirection,
	smHorizontal,
	mdHorizontal,
	lgHorizontal,
	xlHorizontal,
	smVertical,
	mdVertical,
	lgVertical,
	xlVertical,
	...otherProps
}) => {
	return (
		<StyledFlex
			direction={direction}
			fullWidth={fullWidth}
			fullHeight={fullHeight}
			wrapItems={wrapItems}
			horizontal={horizontal}
			vertical={vertical}
			smDirection={smDirection}
			mdDirection={mdDirection}
			lgDirection={lgDirection}
			xlDirection={xlDirection}
			smHorizontal={smHorizontal}
			mdHorizontal={mdHorizontal}
			lgHorizontal={lgHorizontal}
			xlHorizontal={xlHorizontal}
			smVertical={smVertical}
			mdVertical={mdVertical}
			lgVertical={lgVertical}
			xlVertical={xlVertical}
			{...otherProps}
		>
			{children}
		</StyledFlex>
	);
};

export { Flex };
