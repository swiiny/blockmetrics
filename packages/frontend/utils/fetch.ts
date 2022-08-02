import axios from 'axios';
import { ELanguage } from '../styles/theme/utils/enum';
import { axiosRest } from './variables';

export const getBlockchainById = async (id: string): Promise<TBlockchain | null> => {
	try {
		const { data } = await axiosRest.get(`/blockchain?id=${id}`);

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
		const { data } = await axiosRest.get(`/blockchain/metadata?id=${id}&language=${language || 'en'}`);

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

export const getBlockchainMetadataAndScoreById = async (
	id: string,
	language: ELanguage
): Promise<{ metadata: TBlockchainMetadata; score: TBlockchainScore } | null> => {
	try {
		const { data } = await axiosRest.get(`/blockchain/metadataAndScore?id=${id}&language=${language || 'en'}`);

		return {
			metadata: {
				tagline: data.tagline,
				description: data.description,
				genesis_block: data.genesis_block,
				source: data.source,
				links: data.links,
				blockchain_id: data.id
			},
			score: {
				id: data.id,
				rank: data.rank,
				score: data.score,
				reliability: data.reliability,
				token_count: data.token_count,
				power_consumption: data.power_consumption,
				total_value_locked: data.total_value_locked,
				speed: data.speed
			}
		};
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
		const { data } = await axiosRest.get(`/blockchain/all?id=${id}&language=${language || 'en'}`);

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
