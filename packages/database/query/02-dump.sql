USE blockmetrics;

DROP TABLE IF EXISTS `blockchain`;

CREATE TABLE `blockchain` (
  `id` varchar(255) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `logoUrl` VARCHAR(255) NOT NULL,
  `note` TINYINT(100) NULL,
  `power_consumption` INT NULL,
  `node_count` INT UNSIGNED NULL,
  `account_count` INT UNSIGNED NULL,
  `hashrate` INT NULL,
  `average_block_time` FLOAT NULL,
  `token_count` INT UNSIGNED NULL,
  `gas_price` INT NULL,
  `description_en` TEXT(2000) NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `updated_at` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8mb4;

DROP TABLE IF EXISTS `node_count_history`;
CREATE TABLE `node_count_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `node_count` INT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `fk_node_count_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_node_count_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics`.`blockchain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB CHARSET=utf8mb4;

DROP TABLE IF EXISTS `gas_price_history`;
CREATE TABLE `gas_price_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `gas_price` INT NULL,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `fk_gas_price_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_gas_price_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics`.`blockchain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB CHARSET=utf8mb4;


INSERT INTO `blockchain` (`id`, `name`, `logoUrl`, `note`, `power_consumption`, `node_count`, `account_count`, `hashrate`, `average_block_time`, `token_count`, `gas_price`, `description_en`, `created_at`, `updated_at`) VALUES
('0bb6df38-231e-47d3-b427-88d16a65580e', 'Binance SC', '/assets/img/binance-smart-chain.svg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-19 11:47:09', '2022-04-19 11:47:09'),
('1daa2a79-98cc-49a5-970a-0ad620a8b0d9', 'Bitcoin', '/assets/img/bitcoin.svg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-19 11:48:19', '2022-04-19 11:48:19'),
('387123e4-6a73-44aa-b57e-79b5ed1246d4', 'Ethereum', '/assets/img/ethereum.svg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-19 11:46:20', '2022-04-19 11:46:20'),
('4df0b4ad-2165-4543-a74b-7cdf46f9c5e3', 'Polygon', '/assets/img/polygon-pos.svg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-19 11:47:32', '2022-04-19 11:47:32'),
('7fc003e2-680f-4e69-9741-b00c18d2e6dc', 'Avalanche', '/assets/img/avalanche.svg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-19 11:50:53', '2022-04-19 11:50:53');
