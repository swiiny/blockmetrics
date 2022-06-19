import axios from 'axios';
import { ELanguage } from '../styles/theme/utils/enum';
import { axiosRest } from './variables';

export const getBlockchainById = async (id: string): Promise<TBlockchain | null> => {
	try {
		const { data } = await axiosRest.get(`/get/blockchain?id=${id}`);

		return data as TBlockchain;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('getBlockchainById', error);
		} else {
			console.error('getBlockchainById', error);
		}

		return null;
	}
};

export const getBlockchainMetadataById = async (
	id: string,
	language: ELanguage
): Promise<TBlockchainMetadata | null> => {
	try {
		const { data } = await axiosRest.get(`/get/blockchain/metadata?id=${id}&language=${language || 'en'}`);

		console.log('res: ', data);

		return data as TBlockchainMetadata;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('getBlockchainMetadataById', error);
		} else {
			console.error('getBlockchainMetadataById', error);
		}

		return null;
	}
};

export const getBlockchainAndMetadataById = async (
	id: string,
	language?: ELanguage
): Promise<{ blockchain: TBlockchain; metadata: TBlockchainMetadata } | null> => {
	try {
		const { data } = await axiosRest.get(`/get/blockchain/all?id=${id}&language=${language || 'en'}`);

		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('getBlockchainMetadataById', error);
		} else {
			console.error('getBlockchainMetadataById', error);
		}

		return null;
	}
};
