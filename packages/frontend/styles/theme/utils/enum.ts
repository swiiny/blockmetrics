export enum ESize {
	unset = 'unset',
	'4xs' = '4xs',
	'3xs' = '3xs',
	'2xs' = '2xs',
	xs = 'xs',
	s = 's',
	m = 'm',
	l = 'l',
	xl = 'xl',
	'2xl' = '2xl',
	'3xl' = '3xl',
	'4xl' = '4xl',
	'5xl' = '5xl',
	'6xl' = '6xl',
	'7xl' = '7xl',
	'8xl' = '8xl'
}

export enum EPosition {
	top = 'top',
	topRight = 'topRight',
	topLeft = 'topLeft',
	bottom = 'bottom',
	bottomRight = 'bottomRight',
	bottomLeft = 'bottomLeft',
	left = 'left',
	closeLeft = 'closeLeft',
	closerLeft = 'closerLeft',
	right = 'right',
	closeRight = 'closeRight',
	closerRight = 'closerRight',
	center = 'center',
	none = 'none'
}

export enum EDirection {
	all = 'all',
	horizontal = 'horizontal',
	vertical = 'vertical'
}

export enum ETextAlign {
	left = 'left',
	right = 'right',
	center = 'center'
}

export enum ETextWeight {
	thin = '300',
	normal = 'normal',
	bold = '600'
}

export enum EMediaQuery {
	xs = '0px',
	sm = '660px',
	md = '900px',
	lg = '1200px',
	xl = '1600px'
}

export enum EFlex {
	row = 'row',
	rowReverse = 'row-reverse',
	column = 'column',
	columnReverse = 'column-reverse',
	start = 'flex-start',
	end = 'flex-end',
	between = 'space-between',
	around = 'space-around',
	center = 'center'
}

export enum ETextColor {
	default = 'default',
	light = 'light',
	red = 'red',
	green = 'green',
	gradient = 'gradient',
	accent = 'accent',
	positive = 'positive',
	negative = 'negative',
	warning = 'warning',
	disabled = 'disabled'
}

export enum ETextType {
	h1 = 'h1',
	h2 = 'h2',
	h3 = 'h3',
	h4 = 'h4',
	p = 'p',
	link = 'link',
	span = 'span',
	externalLink = 'externalLink'
}

export enum ELanguage {
	en = 'en'
}

export enum EDailyData {
	activeUsers = 'activeUsers',
	averageBlocktime = 'averageBlocktime',
	averageGasPrice = 'averageGasPrice',
	difficulty = 'difficulty',
	hashrate = 'hashrate',
	newAddress = 'newAddress',
	newContract = 'newContract',
	newTokens = 'newTokens',
	tokenCount = 'tokenCount',
	nodeCount = 'nodeCount',
	transactionCount = 'transactionCount'
}

export enum EChartType {
	line,
	bar,
	pie,
	doughnut
}
