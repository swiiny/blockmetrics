import { ESubscribeType } from '../../styles/theme/utils/enum';

interface IMessage {
	channel: ESubscribeType;
	data: any;
}

interface IUseWebsocket {
	subscribeTo: (channel: ESubscribeType) => void;
	unsubscribeFrom: (channel: ESubscribeType) => void;
	initWebsocket: () => void;
	message?: IMessage;
	loading: boolean;
	wsConnected: boolean;
}

export type { IMessage, IUseWebsocket };
