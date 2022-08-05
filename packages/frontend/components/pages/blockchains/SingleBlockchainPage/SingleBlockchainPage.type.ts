import { EIcon, ESubscribeType } from '../../../../styles/theme/utils/enum';

interface ISingleBlockchainPage {
	name: string;
	chainId: string;
	chainLogo: EIcon;
	blockchainChannel: ESubscribeType;
}

export type { ISingleBlockchainPage };
