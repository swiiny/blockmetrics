-- -------------------------------------------------------------
-- TablePlus 4.6.8(424)
--
-- https://tableplus.com/
--
-- Database: blockmetrics-db
-- Generation Time: 2022-06-12 01:57:21.4450
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE `blockmetrics-db`;

DROP TABLE IF EXISTS `blockchain`;
CREATE TABLE `blockchain` (
  `id` varchar(255) NOT NULL,
  `name` varchar(128) NOT NULL,
  `logoUrl` varchar(255) NOT NULL,
  `note` tinyint DEFAULT NULL,
  `node_count` int unsigned DEFAULT NULL,
  `testnet_node_count` int unsigned DEFAULT NULL,
  `single_node_power_consumption` float DEFAULT '0',
  `blockchain_power_consumption` int DEFAULT NULL,
  `hashrate` double DEFAULT NULL,
  `difficulty` bigint DEFAULT NULL,
  `last_block_timestamp` float DEFAULT NULL,
  `token_count` int unsigned DEFAULT NULL,
  `transaction_count` int unsigned NOT NULL DEFAULT '0',
  `gas_price` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `consensus` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_active_users_history`;
CREATE TABLE `daily_active_users_history` (
  `id` varchar(255) NOT NULL,
  `users_count` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blockchain_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_daily_active_users_history_blockchain1_idx` (`blockchain_id`),
  CONSTRAINT `fk_daily_active_users_history_blockchain1` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_average_blocktime_history`;
CREATE TABLE `daily_average_blocktime_history` (
  `id` varchar(255) NOT NULL,
  `seconds` float DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blockchain_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_time_between_blocks_history_blockchain1_idx` (`blockchain_id`),
  CONSTRAINT `fk_time_between_blocks_history_blockchain1` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_average_gas_price_history`;
CREATE TABLE `daily_average_gas_price_history` (
  `id` varchar(255) NOT NULL,
  `blockchain_id` varchar(255) NOT NULL,
  `gas_price` int DEFAULT NULL COMMENT '[Wei]',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_gas_price_history_blockchain_idx` (`blockchain_id`),
  CONSTRAINT `fk_gas_price_history_blockchain` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_hashrate_history`;
CREATE TABLE `daily_hashrate_history` (
  `id` varchar(255) NOT NULL,
  `blockchain_id` varchar(255) NOT NULL,
  `hashrate` double DEFAULT NULL COMMENT '[TH/s]',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_hashrate_history_blockchain_idx` (`blockchain_id`),
  CONSTRAINT `fk_hashrate_history_blockchain` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_new_addresses_history`;
CREATE TABLE `daily_new_addresses_history` (
  `id` varchar(255) NOT NULL,
  `addresses_count` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blockchain_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_new_daily_users_history_blockchain1_idx` (`blockchain_id`),
  CONSTRAINT `fk_new_daily_users_history_blockchain1` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_new_contracts_history`;
CREATE TABLE `daily_new_contracts_history` (
  `id` varchar(255) NOT NULL,
  `contracts_count` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blockchain_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_new_daily_contracts_history_blockchain1_idx` (`blockchain_id`),
  CONSTRAINT `fk_new_daily_contracts_history_blockchain1` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_new_tokens_history`;
CREATE TABLE `daily_new_tokens_history` (
  `id` varchar(255) NOT NULL,
  `tokens_count` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blockchain_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_daily_new_tokens_history_blockchain1_idx` (`blockchain_id`),
  CONSTRAINT `fk_daily_new_tokens_history_blockchain1` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `daily_node_count_history`;
CREATE TABLE `daily_node_count_history` (
  `id` varchar(255) NOT NULL,
  `blockchain_id` varchar(255) NOT NULL,
  `node_count` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_node_count_history_blockchain_idx` (`blockchain_id`),
  CONSTRAINT `fk_node_count_history_blockchain` FOREIGN KEY (`blockchain_id`) REFERENCES `blockchain` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `blockchain` (`id`, `name`, `logoUrl`, `note`, `node_count`, `testnet_node_count`, `single_node_power_consumption`, `blockchain_power_consumption`, `hashrate`, `difficulty`, `last_block_timestamp`, `token_count`, `transaction_count`, `gas_price`, `created_at`, `updated_at`, `consensus`) VALUES
('avalanche', 'Avalanche', '/assets/images/blockchains/avalanche.svg', NULL, NULL, 0, 51.33, 0, 0, NULL, NULL, 0, 0, NULL, '2022-04-19 11:50:53', '2022-06-11 23:56:24', 'pos'),
('binance-smart-chain', 'Binance SC', '/assets/images/blockchains/binance-smart-chain.svg', NULL, NULL, 0, 50, 0, 0, NULL, NULL, 0, 0, NULL, '2022-04-19 11:47:09', '2022-06-11 23:56:24', 'pos'),
('bitcoin', 'Bitcoin', '/assets/images/blockchains/bitcoin.svg', NULL, NULL, 0, 0, 0, 0, NULL, NULL, 1, 0, NULL, '2022-04-19 11:48:19', '2022-06-11 23:56:24', 'pow'),
('ethereum', 'Ethereum', '/assets/images/blockchains/ethereum.svg', NULL, NULL, 0, 0, 0, 0, NULL, NULL, 0, 0, NULL, '2022-04-19 11:46:20', '2022-06-11 23:56:24', 'pow'),
('fantom', 'Fantom', '/assets/images/blockchains/fantom.svg', NULL, 89, 0, 0.25, 0, 0, NULL, NULL, 0, 0, NULL, '2022-05-14 09:47:40', '2022-06-11 23:56:24', 'pos'),
('polygon', 'Polygon', '/assets/images/blockchains/polygon-pos.svg', NULL, 100, 0, 1000, 0, 0, NULL, NULL, 0, 0, NULL, '2022-04-19 11:47:32', '2022-06-11 23:56:24', 'pos');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;