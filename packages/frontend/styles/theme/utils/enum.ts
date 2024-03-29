export enum ESize {
	unset = 'unset',
	'7xs' = '7xs',
	'6xs' = '6xs',
	'5xs' = '5xs',
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

export enum ERequestState {
	unset = 'unset',
	loading = 'loading',
	success = 'success',
	error = 'error'
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
	thin = '100',
	light = '300',
	normal = '400',
	medium = '500',
	semiBold = '600',
	bold = '700'
}

export enum EMediaQuery {
	xs = '0px',
	ssm = '550px',
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
	transparent = 'transparent',
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
	powerConsumption = 'powerConsumption',
	transactionCount = 'transactionCount',
	totalValueLocked = 'totalValueLocked'
}

export enum EDailyGlobalData {
	activeUsers = 'activeUsers',
	transactionsCount = 'transactionsCount',
	powerConsumption = 'powerConsumption',
	totalValueLocked = 'totalValueLocked'
}

export enum EChartType {
	line = 'line',
	bar = 'bar',
	pie = 'pie',
	doughnut = 'doughnut'
}

export enum EGlobalData {
	powerConsumption = 'powerConsumption',
	tokenCount = 'tokenCount',
	nodeCount = 'nodeCount',
	transactionCount = 'transactionCount',
	todayTransactionsCount = 'todayTransactionCount',
	addressCount = 'addressCount',
	userCount = 'userCount',
	contractCount = 'contractCount',
	todayAddressCount = 'todayAddressCount',
	todayUserCount = 'todayUserCount',
	todayContractCount = 'todayContractCount'
}

export enum ESubscribeType {
	unset = 'unset',
	blockchains = 'blockchains',
	blockchainCards = 'blockchainCards',
	blockchain = 'blockchain',
	transactionCount = 'transactionCount',
	todayTransactionCount = 'todayTransactionCount',
	addressCount = 'addressCount',
	todayAddressCount = 'todayAddressCount',
	todayUserCount = 'todayUserCount',
	todayContractCount = 'todayContractCount',
	ethereum = 'ethereum',
	bitcoin = 'bitcoin',
	polygon = 'polygon',
	fantom = 'fantom',
	bsc = 'binance-smart-chain',
	avalanche = 'avalanche'
}

export enum EIcon {
	cronos = 'cronos',
	arbitrum = 'arbitrum',
	ethereum = 'ethereum',
	bitcoin = 'bitcoin',
	bsc = 'binance-smart-chain',
	polygon = 'polygon',
	fantom = 'fantom',
	avalanche = 'avalanche',
	luna = 'luna',
	optimism = 'optimism',
	solana = 'solana',
	polkadot = 'polkadot',
	harmony = 'harmony',
	tron = 'tron',
	ripple = 'ripple',
	cardano = 'cardano',
	celo = 'celo',
	energy = 'energy',
	user = 'user',
	swap = 'swap',
	gas = 'gas',
	token = 'token',
	chart = 'chart',
	check = 'check',
	sortBottom = 'sort-bottom',
	sortTop = 'sort-top',
	arrowBottom = 'arrow-bottom',
	arrowTop = 'arrow-top',
	arrowLeft = 'arrow-left',
	arrowRight = 'arrow-right',
	timer = 'timer',
	issue = 'issue',
	help = 'help',
	none = 'none'
}

export enum ETextTransform {
	none = 'none',
	uppercase = 'uppercase',
	lowercase = 'lowercase',
	capitalize = 'capitalize'
}

export enum EDocumentationId {
	whatIsABlockchain = 'what-is-a-blockchain',
	howIsTheRankingAssigned = 'how-is-the-ranking-assigned',
	howIsThePowerConsumptionCalculated = 'how-is-the-power-consumption-calculated',
	sources = 'sources'
}
