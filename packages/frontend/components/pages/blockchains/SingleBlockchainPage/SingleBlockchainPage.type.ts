import { EIcon, ESubscribeType } from '../../../../styles/theme/utils/enum';

interface ISingleBlockchainPage {
	chainId: string;
	chainLogo: EIcon;
	blockchainChannel: ESubscribeType;
}

export type { ISingleBlockchainPage };
