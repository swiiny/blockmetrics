import React, { FC, useMemo } from 'react';
import { EChartType, EDailyData, ESize } from '../../../../styles/theme/utils/enum';
import { BLOCKCHAINS } from '../../../../utils/variables';
import ChartCard from '../../../cards/ChartCard';
import { IChartCard } from '../../../cards/ChartCard/ChartCard.type';
import { StyledChartList } from './BlockchainData.styles';
import { IBlockchainData } from './BlockchainData.type';

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
			chainId: chainId,
			helpText:
				'Number of nodes in the network, a node is a computer that contains a copy of the blockchain and can process transactions.'
		});

		result.push({
			label: 'Transaction count',
			chartType: EChartType.bar,
			dailyType: EDailyData.transactionCount,
			chainId: chainId,
			helpText: 'A transaction is an action that changes the state of the blockchain.'
		});

		if (chainId !== BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Average gas price',
				chartType: EChartType.bar,
				unit: 'wei',
				dailyType: EDailyData.averageGasPrice,
				chainId: chainId,
				helpText:
					'The average gas price, the gas price is used to calculate the fee paid to the miners/validators to execute a transaction.'
			});
		}

		if (chainId === BLOCKCHAINS.ethereum.id || chainId === BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Average hashrate',
				chartType: EChartType.bar,
				unit: 'TH/s',
				dailyType: EDailyData.hashrate,
				chainId: chainId,
				helpText:
					'The hashrate is the number of hashes per second. It is the average number of hashes per second that the nodes have processed.'
			});
		}

		if (chainId !== BLOCKCHAINS.polygon.id && chainId !== BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'New smart Contracts',
				chartType: EChartType.bar,
				dailyType: EDailyData.newContract,
				chainId: chainId,
				helpText:
					'The number of new smart contracts created. A smart contract is a program that runs on the blockchain.'
			});
		}

		result.push({
			label: 'Active users',
			chartType: EChartType.bar,
			dailyType: EDailyData.activeUsers,
			chainId: chainId,
			helpText:
				'The number of active users on the blockchain. An active user is a user that has made at least 1 transactions.'
		});

		result.push({
			label: 'New addresses',
			chartType: EChartType.bar,
			dailyType: EDailyData.newAddress,
			chainId: chainId,
			helpText: 'The number of new addresses created. An address is a unique identifier for a user or a smart contract.'
		});

		if (chainId !== BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Average block time',
				chartType: EChartType.line,
				decimals: 2,
				unit: 's',
				dailyType: EDailyData.averageBlocktime,
				chainId: chainId,
				helpText: 'The average block time is the average time it takes to mine a new block.'
			});
		}

		result.push({
			label: 'Power consumption',
			chartType: EChartType.line,
			dailyType: EDailyData.powerConsumption,
			unit: 'W/h',
			chainId: chainId,
			helpText: 'The power consumption is the amount of energy consumed by the nodes to run the blockchain.'
		});

		if (chainId === BLOCKCHAINS.ethereum.id || chainId === BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Difficulty',
				chartType: EChartType.line,
				dailyType: EDailyData.difficulty,
				chainId: chainId,
				helpText: 'The difficulty is the mesure of how hard it is to find a new block.'
			});
		}

		if (chainId !== BLOCKCHAINS.bitcoin.id) {
			result.push({
				label: 'Total Value Locked',
				chartType: EChartType.line,
				unit: ' $',
				dailyType: EDailyData.totalValueLocked,
				chainId: chainId,
				helpText: 'The total value locked is the total amount of money locked in the blockchain.'
			});
		}

		return result;
	}, [chainId]);

	return (
		<StyledChartList marginY={ESize['3xl']}>
			{chartsToDisplay.map(({ label, chartType, dailyType, unit, decimals, chainId, helpText }) => (
				<ChartCard
					key={dailyType}
					label={label}
					chartType={chartType}
					unit={unit}
					decimals={decimals}
					dailyType={dailyType}
					chainId={chainId}
					helpText={helpText}
					padding={ESize.xs}
				/>
			))}
		</StyledChartList>
	);
};

export { BlockchainData };
