USE db;

CREATE TABLE IF NOT EXISTS `blockmetrics`.`Blockchain` (
  `id` INT NOT NULL,
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
  `created_at` DATETIME NOT NULL,
  `edited_at` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8mb4