# Blockmetrics Websocket API

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Subscriptions](#subscriptions)

## Introduction

This Service is used to stream blockchains data to [Blockmetrics](https://block-metrics.io)

## Technologies

The service work with:

- Ws: 8.6.0

## Subscriptions

- [How it works](#how-it-works)
- [Channels](#channels)

### How it works

The subscribe/unsubscribe messages should be built according to the following structure and be stringified before beeing sent.

```
// subscribe

{
  type: "subscribe",
  channel: "channelYouWantToSubscribe"
}

// or to unsubscribe

{
  type: "unsubscribe",
  channel: "channelYouWantToUnsubscribe"
}
```

### Channels

#### Blockchains

##### Message

```
{
  ...
  channel: "blockchains"
}
```

##### Response

```
{
  channel: "blockchains",
  data: ...
}
```

##### Update data

| Name                          | Type          | Description                    |
| ----------------------------- | ------------- | ------------------------------ |
| id                            | string (uuid) | _Example:_ `"ethereum"`        |
| name                          | string        | _Example:_ `"Ethereum"`        |
| reliability                   | integer       | _Example:_ `79`                |
| node_count                    | integer       | _Example:_ `5000`              |
| testnet_node_count            | integer       | _Example:_ `100`               |
| single_node_power_consumption | number        | _Example:_ `50`                |
| blockchain_power_consumption  | number        | _Example:_ `100000`            |
| hashrate                      | number        | _Example:_ `16745649.145948`   |
| difficulty                    | number        | _Example:_ `1359284933`        |
| last_block_timestamp          | number        | _Example:_ `1564984100`        |
| token_count                   | integer       | _Example:_ `4890`              |
| transaction_count             | integer       | _Example:_ `178039483`         |
| gas_price                     | number        | _Example:_ `250000000`         |
| consensus                     | string        | _Example:_ `"PoW"`             |
| today_transaction_count       | integer       | _Example:_ `1928493`           |
| address_count                 | integer       | _Example:_ `192849345`         |
| today_address_count           | integer       | _Example:_ `1928493`           |
| total_value_locked            | integer       | _Example:_ `192849308903.3464` |

---

#### Blockchains Cards

##### Message

```
{
  ...
  channel: "blockchainsCards"
}
```

##### Response

```
{
  channel: "blockchainsCards",
  data: ...
}
```

##### Update data

| Name                         | Type          | Description             |
| ---------------------------- | ------------- | ----------------------- |
| id                           | string (uuid) | _Example:_ `"ethereum"` |
| name                         | string        | _Example:_ `"Ethereum"` |
| reliability                  | integer       | _Example:_ `79`         |
| blockchain_power_consumption | number        | _Example:_ `100000`     |
| token_count                  | integer       | _Example:_ `4890`       |
| gas_price                    | number        | _Example:_ `250000000`  |
| rank                         | string        | _Example:_ `"B+"`       |

---

#### Single blockchain

##### Details

Available blockchains id

- ethereum
- binance-smart-chain
- polygon
- avalanche
- fantom
- bitcoin

##### Message

```
{
  ...
  channel: "blockchain_id"
}
```

##### Response

```
{
  channel: "blockchain_id",
  data: ...
}
```

##### Update data

| Name                          | Type          | Description                    |
| ----------------------------- | ------------- | ------------------------------ |
| id                            | string (uuid) | _Example:_ `"ethereum"`        |
| name                          | string        | _Example:_ `"Ethereum"`        |
| reliability                   | integer       | _Example:_ `79`                |
| node_count                    | integer       | _Example:_ `5000`              |
| testnet_node_count            | integer       | _Example:_ `100`               |
| single_node_power_consumption | number        | _Example:_ `50`                |
| blockchain_power_consumption  | number        | _Example:_ `100000`            |
| hashrate                      | number        | _Example:_ `16745649.145948`   |
| difficulty                    | number        | _Example:_ `1359284933`        |
| last_block_timestamp          | number        | _Example:_ `1564984100`        |
| token_count                   | integer       | _Example:_ `4890`              |
| transaction_count             | integer       | _Example:_ `178039483`         |
| gas_price                     | number        | _Example:_ `250000000`         |
| consensus                     | string        | _Example:_ `"PoW"`             |
| today_transaction_count       | integer       | _Example:_ `1928493`           |
| address_count                 | integer       | _Example:_ `192849345`         |
| today_address_count           | integer       | _Example:_ `1928493`           |
| total_value_locked            | integer       | _Example:_ `192849308903.3464` |

---

#### Blockchains Total

##### Details

Available properties

- addressCount
- transactionCount
- todayTransactionCount
- todayAddressCount

##### Message

```
{
  ...
  channel: "total_property"
}
```

##### Response

```
{
  channel: "total_property",
  data: ...
}
```

##### Update data

| Name  | Type    | Description              |
| ----- | ------- | ------------------------ |
| value | integer | _Example:_ `12928463395` |
