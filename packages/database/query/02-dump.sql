-- MySQL Script generated by MySQL Workbench
-- Fri Apr 29 21:23:54 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema blockmetrics
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blockmetrics
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blockmetrics-db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `blockmetrics-db` ;

-- -----------------------------------------------------
-- Table `blockmetrics-db`.`blockchain`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`blockchain` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `logoUrl` VARCHAR(255) NOT NULL,
  `note` TINYINT NULL DEFAULT NULL,
  `power_consumption` INT NULL DEFAULT NULL, -- in watt
  `node_count` INT UNSIGNED NULL DEFAULT NULL,
  `hashrate` DOUBLE NULL DEFAULT NULL,
  `difficulty` BIGINT NULL DEFAULT NULL,
  `time_between_blocks` FLOAT NULL DEFAULT NULL, -- in seconds
  `token_count` INT UNSIGNED NULL DEFAULT NULL,
  `transaction_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `gas_price` INT NULL DEFAULT NULL, -- in wei
  `description_en` TEXT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `consensus` VARCHAR(20) NOT NULL,
  `testnet_node_count` INT UNSIGNED NULL DEFAULT NULL,
  `single_node_power_consumption` FLOAT NULL DEFAULT 0, -- in watt
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`gas_price_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`gas_price_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `gas_price` INT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_gas_price_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_gas_price_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`node_count_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`node_count_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `node_count` INT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_node_count_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_node_count_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`account` (
  `public_address` VARCHAR(255) NOT NULL,
  `first_action_at` DATETIME NULL,
  `last_action_at` DATETIME NULL,
  `action_count` INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`public_address`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`hashrate_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`hashrate_history` (
  `id` VARCHAR(255) NOT NULL,
  `blockchain_id` VARCHAR(255) NOT NULL,
  `hashrate` DOUBLE NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_hashrate_history_blockchain_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_hashrate_history_blockchain`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `blockmetrics-db`.`blockchain_has_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`blockchain_has_account` (
  `blockchain_id` VARCHAR(255) NOT NULL,
  `account_public_address` VARCHAR(255) NOT NULL,
  `is_contract` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`blockchain_id`, `account_public_address`),
  INDEX `fk_blockchain_has_account_account1_idx` (`account_public_address` ASC) VISIBLE,
  INDEX `fk_blockchain_has_account_blockchain1_idx` (`blockchain_id` ASC) VISIBLE,
  CONSTRAINT `fk_blockchain_has_account_blockchain1`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_blockchain_has_account_account1`
    FOREIGN KEY (`account_public_address`)
    REFERENCES `blockmetrics-db`.`account` (`public_address`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `blockmetrics-db`.`block_parsed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blockmetrics-db`.`block_parsed` (
  `blockchain_id` VARCHAR(255) NOT NULL,
  `number` INT NOT NULL DEFAULT 0,
  INDEX `fk_block_parsed_blockchain1_idx` (`blockchain_id` ASC) VISIBLE,
  PRIMARY KEY (`blockchain_id`),
  CONSTRAINT `fk_block_parsed_blockchain1`
    FOREIGN KEY (`blockchain_id`)
    REFERENCES `blockmetrics-db`.`blockchain` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO `blockchain` (`id`, `name`, `logoUrl`, `note`, `power_consumption`, `node_count`, `hashrate`,`difficulty`, `time_between_blocks`, `token_count`, `transaction_count`, `gas_price`, `description_en`, `created_at`, `updated_at`, `consensus`,`testnet_node_count`, `single_node_power_consumption`) VALUES
('0bb6df38-231e-47d3-b427-88d16a65580e', 'Binance SC', '/assets/img/binance-smart-chain.svg', NULL, 0, NULL, 0, NULL, NULL, 0, 0, NULL, NULL, '2022-04-19 11:47:09', '2022-04-19 11:47:09', 'pos', 0, 50),
('1daa2a79-98cc-49a5-970a-0ad620a8b0d9', 'Bitcoin', '/assets/img/bitcoin.svg', NULL, 0, NULL, 0, NULL, NULL, 1, 0, NULL, NULL, '2022-04-19 11:48:19', '2022-04-19 11:48:19', 'pow', 0, 0),
('387123e4-6a73-44aa-b57e-79b5ed1246d4', 'Ethereum', '/assets/img/ethereum.svg', NULL, 0, NULL, 0, NULL, NULL, 0, 0, NULL, NULL, '2022-04-19 11:46:20', '2022-04-19 11:46:20', 'pow', 0, 0),
('4df0b4ad-2165-4543-a74b-7cdf46f9c5e3', 'Polygon', '/assets/img/polygon-pos.svg', NULL, 0, NULL, 0, NULL, NULL, 0, 0, NULL, NULL, '2022-04-19 11:47:32', '2022-04-19 11:47:32', 'pos', 0, 0),
('7fc003e2-680f-4e69-9741-b00c18d2e6dc', 'Avalanche', '/assets/img/avalanche.svg', NULL, 0, NULL, 0, NULL, NULL, 0, 0, NULL, NULL, '2022-04-19 11:50:53', '2022-04-19 11:50:53', 'pos', 0, 51.33),
('a3820e29-a5fc-41af-a5c1-07119795e07d', 'Fantom', '/assets/img/fantom.svg', NULL, 0, NULL, 0, NULL, NULL, 0, 0, NULL, NULL, '2022-05-14 09:47:40', '2022-05-14 09:47:40', 'pos', 0, 0.25);

INSERT INTO `block_parsed` (`blockchain_id`, `number`) VALUES
('0bb6df38-231e-47d3-b427-88d16a65580e', 5000000),
('1daa2a79-98cc-49a5-970a-0ad620a8b0d9', 5000000),
('387123e4-6a73-44aa-b57e-79b5ed1246d4', 5000000),
('4df0b4ad-2165-4543-a74b-7cdf46f9c5e3', 5000000),
('7fc003e2-680f-4e69-9741-b00c18d2e6dc', 5000000),
('a3820e29-a5fc-41af-a5c1-07119795e07d', 5000000);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;