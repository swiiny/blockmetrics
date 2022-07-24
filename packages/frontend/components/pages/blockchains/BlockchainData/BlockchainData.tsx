import React, { FC, useMemo } from 'react';
import { EChartType, EDailyData, ESize } from '../../../../styles/theme/utils/enum';
import { BLOCKCHAINS } from '../../../../utils/variables';
import ChartCard from '../../../cards/ChartCard';
import { IChartCard } from '../../../cards/ChartCard/ChartCard.type';
import { StyledChartList } from './BlockchainData.styles';

const BlockchainData: FC<IBlockchainData> = ({ chainId }) => {
	const chartsToDisplay: IChartCard[] = useMemo(() => {
		const result: IChartCard[] = [];

		if (!chainId) {
			return result;
		}

		result.push({
			label: 'Node count',
			chartType: EChartType.bar,
			dailyType: EDailyData.nodeCount,
			chainId: chainId
		});

		result.push({
			label: 'Transaction count',
			chartType: EChartType.bar,
			dailyType: EDailyData.transactionCount,
			chainId: chainId
		});

		if (chainId !== BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Gas price',
				chartType: EChartType.bar,
				unit: 'wei',
				dailyType: EDailyData.averageGasPrice,
				chainId: chainId
			});
		}

		if (chainId === BLOCKCHAINS.ethereum.id || chainId === BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Hashrate',
				chartType: EChartType.bar,
				unit: 'TH/s',
				dailyType: EDailyData.hashrate,
				chainId: chainId
			});
		}

		if (chainId !== BLOCKCHAINS.polygon.id && chainId !== BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'New smart Contracts',
				chartType: EChartType.bar,
				dailyType: EDailyData.newContract,
				chainId: chainId
			});
		}

		if (chainId !== BLOCKCHAINS.avalanche.id && chainId !== BLOCKCHAINS.fantom.id) {
			result.push({
				label: 'Active users',
				chartType: EChartType.bar,
				dailyType: EDailyData.activeUsers,
				chainId: chainId
			});
		}

		result.push({
			label: 'New addresses',
			chartType: EChartType.bar,
			dailyType: EDailyData.newAddress,
			chainId: chainId
		});

		result.push({
			label: 'Average block time',
			chartType: EChartType.line,
			decimals: 2,
			unit: 's',
			dailyType: EDailyData.averageBlocktime,
			chainId: chainId
		});

		result.push({
			label: 'Power consumption',
			chartType: EChartType.line,
			dailyType: EDailyData.powerConsumption,
			unit: 'W/h',
			chainId: chainId
		});

		if (chainId === BLOCKCHAINS.ethereum.id || chainId === BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Difficulty',
				chartType: EChartType.line,
				dailyType: EDailyData.difficulty,
				chainId: chainId
			});
		}

		if (chainId !== BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Total Value Locked',
				chartType: EChartType.line,
				unit: ' $',
				dailyType: EDailyData.totalValueLocked,
				chainId: chainId
			});
		}

		return result;
	}, [chainId]);

	return (
		<StyledChartList marginY={ESize['3xl']}>
			{chartsToDisplay.map(({ label, chartType, dailyType, unit, decimals, chainId }) => (
				<ChartCard
					key={dailyType}
					label={label}
					chartType={chartType}
					unit={unit}
					decimals={decimals}
					dailyType={dailyType}
					chainId={chainId}
					padding={ESize.xs}
				/>
			))}
		</StyledChartList>
	);
};

export { BlockchainData };
