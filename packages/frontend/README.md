# Blockmetrics frontend

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Style](#style)

## Introduction

## Technologies

Project is created with:

![npm](https://img.shields.io/npm/v/react?label=React)
![npm](https://img.shields.io/npm/v/next?label=Next)
![npm](https://img.shields.io/npm/v/typescript?label=TypeScript)
![npm](https://img.shields.io/npm/v/styled-components?label=Styled%20Components)
![npm](https://img.shields.io/npm/v/chart.js?label=Chart.js)
![npm](https://img.shields.io/npm/v/websocket?label=Websocket)

## Style

### Theme

- [Components](#components)
- [Layouts](#layouts)
- [Global props](#global-props)

### Components

- [BMButton](#bmbutton)
- [BMBlockPattern](#bmblockpattern)
- [BMCardContainer](#bmcardcontainer)
- [BMLink](#BMLink)
- [BMGradientSeparator](#bmgradientseparator)
- [BMHeading](#bmheading)
- [BMHivePattern](#bmhivepattern)
- [BMIcon](#bmicon)
- [BMListItem](#bmlistitem)
- [BMProgressBar](#bmprogressbar)
- [BMText](#bmtext)
- [BMSkeleton](#bmskeleton)

#### BMButton

![bmbutton](doc/assets/bmbutton.png)

##### Props

| Name      | Type                      | Default  | Description                                                                                                     |
| --------- | :------------------------ | :------- | :-------------------------------------------------------------------------------------------------------------- |
| children  | React.ReactNode, string   | null     | label                                                                                                           |
| isLink    | boolean                   | false    | <a /> element, should receive href from a \<Link href="..." passHref /> component                               |
| onClick   | void                      | () => {} | function called when user click on the button                                                                   |
| secondary | boolean                   | false    | if true background partially transparent                                                                        |
| disabled  | boolean                   | false    | deactivate button                                                                                               |
| fullWidth | boolean                   | false    | set width to 100%                                                                                               |
| ariaLabel | string                    | null     | Add custom aria label if children is not string, by default children will be set as aria label if it's a string |
| size      | ESize.s, ESize.m, ESize.l | ESize.m  | Size of the button                                                                                              |

---

---

### Layouts

- [Flex](#flex)
- [Spacing](#spacing)
- [Main](#main)
- [Column](#column)

#### Flex

#### props

| Name                                                  | Type                                                              | Default     | Description                  |
| ----------------------------------------------------- | ----------------------------------------------------------------- | ----------- | :--------------------------- |
| children                                              | React.ReactNode                                                   | null        | Children                     |
| fullWidth                                             | boolean                                                           | false       | Set container width to 100%. |
| fullHeight                                            | boolean                                                           | false       | Set container height to 100% |
| wrapItems                                             | boolean                                                           | false       | activate flex wrap           |
| direction                                             | EFlex.row, EFlex.rowReverse, EFlex.column, Flex.columnReverse     | EFlex.row   | Flex direction               |
| horizontal                                            | EFlex.start, EFlex.end, EFlex.between, EFlex.around, EFlex.center | EFlex.start | justify-content              |
| vertical                                              | EFlex.start, EFlex.end, EFlex.between, EFlex.around, Elex.center  | EFlex.start | align-items                  |
| smDirection, mdDirection, lgDirection, xlDirection    | EFlex.row, EFlex.rowReverse, EFlex.column, Flex.columnReverse     | null        | Responsive flex-direction    |
| smHorizontal, mdHorizontal, gHorizontal, xlHorizontal | EFlex.start, EFlex.end, EFlex.between, EFlex.around, EFlex.center | null        | Responsive justify-content   |
| smVertical, mdVertical, lgVertical, xlVertical        | EFlex.start, EFlex.end, EFlex.between, EFlex.around, EFlex.center | null        | Responsive align-items       |

# to remove

> The props extends [Padding](#padding)

---

#### Spacing

##### props

| Name        | Type       | Default        | Description                                                       |
| ----------- | :--------- | -------------- | ----------------------------------------------------------------- |
| size        | ESize      | ESize.l        | Size of the space                                                 |
| smSize      | ESize      | null           | Responsive size of the margin (smaller to sm)                     |
| mdSize      | ESize      | null           | Responsive size of the margin (smaller to md)                     |
| lgSize      | ESize      | null           | Responsive size of the margin (smaller to lg)                     |
| xlSize      | ESize      | null           | Responsive size of the margin (smaller to xl)                     |
| xsDirection | EDirection | EDirection.all | space horizontal, space vertical or space horizontal and vertical |
| smDirection | EDirection | null           | space horizontal, space vertical or space horizontal and vertical |
| mdDirection | EDirection | null           | space horizontal, space vertical or space horizontal and vertical |
| lgDirection | EDirection | null           | space horizontal, space vertical or space horizontal and vertical |
| xlDirection | EDirection | null           | space horizontal, space vertical or space horizontal and vertical |

---

#### Main

Main container with margin and padding to prevent overflow behind the navbar

---

#### Column

#### props

| Name     | Type                | Default | Description                               |
| -------- | ------------------- | ------- | :---------------------------------------- |
| children | React.ReactNode     | null    | Children                                  |
| columns  | number from 0 to 12 | 12      | width by default including bigger than xl |
| sm       | number from 0 to 12 | null    | width for smaller than sm                 |
| md       | number from 0 to 12 | null    | width for smaller than md                 |
| lg       | number from 0 to 12 | null    | width for smaller than lg                 |
| xl       | number from 0 to 12 | null    | width for smaller than xl                 |

> The props extends [Padding](#padding)

---

### Functions

### Enumerations

### Global props

- [Padding](#padding)
- [Margin](#margin)

#### Padding

#### props

| Name                                                               | Type  | Default | Description         |
| ------------------------------------------------------------------ | ----- | ------- | :------------------ |
| padding                                                            | ESize | null    | set padding X and Y |
| paddingX                                                           | ESize | null    | set padding X       |
| paddingY                                                           | ESize | null    | set padding Y       |
| paddingBottom                                                      | ESize | null    | set padding bottom  |
| paddingTop                                                         | ESize | null    | set padding top     |
| paddingLeft                                                        | ESize | null    | set padding left    |
| paddingRight                                                       | ESize | null    | set padding right   |
| smPadding, mdPadding, lgPadding, xlPadding                         | ESize | null    | Responsive padding  |
| smPaddingX, mdPaddingX, lgPaddingX, xlPaddingX                     | ESize | null    | Responsive padding  |
| smPaddYing, mdPaddiYng, lgPaddinYg, xlPaddingY                     | ESize | null    | Responsive padding  |
| smPaddingBottom, mdPaddingBottom, lgPaddingBottom, xlPaddingBottom | ESize | null    | Responsive padding  |
| smPaddingTop, mdPaddingTop, lgPaddingTop, xlPaddingTop             | ESize | null    | Responsive padding  |
| smPaddingLeft, mdPaddingLeft, lgPaddingLeft, xlPaddingLeft         | ESize | null    | Responsive padding  |
| smPaddingRight, mdPaddingRight, lgPaddingRight, xlPaddingRight     | ESize | null    | Responsive padding  |

---

#### Margin

#### props

| Name                                                           | Type  | Default | Description        |
| -------------------------------------------------------------- | ----- | ------- | :----------------- |
| padding                                                        | ESize | null    | set margin X and Y |
| marginX                                                        | ESize | null    | set margin X       |
| marginY                                                        | ESize | null    | set margin Y       |
| marginBottom                                                   | ESize | null    | set margin bottom  |
| marginTop                                                      | ESize | null    | set margin top     |
| marginLeft                                                     | ESize | null    | set margin left    |
| marginRight                                                    | ESize | null    | set margin right   |
| smMargin, mdMargin, lgMargin, xlMargin                         | ESize | null    | Responsive margin  |
| smMarginX, mdMarginX, lgMarginX, xlMarginX                     | ESize | null    | Responsive margin  |
| smPaddYing, mdPaddiYng, lgPaddinYg, xlMarginY                  | ESize | null    | Responsive margin  |
| smMarginBottom, mdMarginBottom, lgMarginBottom, xlMarginBottom | ESize | null    | Responsive margin  |
| smMarginTop, mdMarginTop, lgMarginTop, xlMarginTop             | ESize | null    | Responsive margin  |
| smMarginLeft, mdMarginLeft, lgMarginLeft, xlMarginLeft         | ESize | null    | Responsive margin  |
| smMarginRight, mdMarginRight, lgMarginRight, xlMarginRight     | ESize | null    | Responsive margin  |
