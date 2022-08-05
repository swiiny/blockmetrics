import { EIcon } from '../../../../styles/theme/utils/enum';

interface IComparePageDefaultBlockchain {
	id: string;
	name: string;
	icon: EIcon;
	isSelected: boolean;
	loading: boolean;
	token_count?: number;
	gas_price?: number;
	blockchain_power_consumption?: number;
	today_transaction_count?: number;
	total_value_locked?: number;
}
export type { IComparePageDefaultBlockchain };
