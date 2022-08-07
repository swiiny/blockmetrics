# Blockmetrics REST API
## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)

## Introduction
The API can be tested at [doc.api-rest.block-metrics.io](https://doc.api-rest.block-metrics.io)

## Technologies
The service work with:
- Express: 4.17.1
- Cors: 2.8.5
- Helmet: 5.0.2

## Generate documentation from swagger.yaml file
`npx swagger-markdown -i ./swagger.yaml`


# Blockmetrics REST API
Blockmetrics REST API

## Version: 1.0.0

**Contact information:**  
jeremy@block-metrics.io  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /blockchains

#### GET
##### Summary

search blockchains

##### Description

Return an array blockchains objects.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| desc | query | Sort result | No | boolean |
| sortBy | query |  | No | string |
| limit | query | maximum number of records to return | No | integer |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 500 | The server can't successfuly execute the request |

### /blockchains/total

#### GET
##### Summary

search blockchains total

##### Description

Return a sum of a property from blockchains objects.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| type | query | The property to sum | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | bad input parameter |
| 500 | The server can't successfuly execute the request |

### /blockchains/chart

#### GET
##### Summary

blockchains monthly chart

##### Description

Return monthly chart data for the blockchains

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| type | query | the property corresponding to the desired chart | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | bad input parameter |
| 500 | The server can't successfuly execute the request |

### /blockchain

#### GET
##### Summary

search blockchain

##### Description

Return an array blockchains objects.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | id of the blockchain to fetch | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | bad input parameter |
| 500 | The server can't successfuly execute the request |

### /blockchain/all

#### GET
##### Summary

blockchain and metadata

##### Description

Return the blockchain and the metadata

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | Id of the blockchain to fetch | Yes | string |
| language | query | Choose the language of the metadata | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | bad input parameter |
| 500 | The server can't successfuly execute the request |

### /blockchain/metadata

#### GET
##### Summary

metadata of the blockchain

##### Description

Return the metadata of a blockchain

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | Id of the blockchain to fetch | Yes | string |
| language | query | Choose the language of the metadata | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | bad input parameter |
| 500 | The server can't successfuly execute the request |

### /blockchain/metadataAndScore

#### GET
##### Summary

metadata and score of the blockchain

##### Description

Return the metadata and the score of a blockchain

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | Id of the blockchain to fetch | Yes | string |
| language | query | Choose the language of the metadata | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | bad input parameter |
| 500 | The server can't successfuly execute the request |

### /blockchain/chart

#### GET
##### Summary

blockchain monthly chart

##### Description

Return monthly chart data for the blockchain

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query | Id of the blockchain to fetch | Yes | string |
| type | query | the property corresponding to the desired chart | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Successful operation |
| 400 | bad input parameter |
| 500 | The server can't successfuly execute the request |

### Models

#### Blockchain

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string (uuid) | _Example:_ `"ethereum"` | Yes |
| name | string | _Example:_ `"Ethereum"` | Yes |
| node_count | integer | _Example:_ `5000` | Yes |
| testnet_node_count | integer | _Example:_ `0` | Yes |
| single_node_power_consumption | number | _Example:_ `50` | Yes |
| blockchain_power_consumption | number | _Example:_ `100000` | Yes |
| hashrate | number | _Example:_ `169.145948` | Yes |
| difficulty | number | _Example:_ `1359284933` | Yes |
| last_block_timestamp | number | _Example:_ `1564984100` | Yes |
| token_count | integer | _Example:_ `4890` | Yes |
| transaction_count | integer | _Example:_ `178039483` | Yes |
| gas_price | number | _Example:_ `250000000` | Yes |
| consensus | string | _Example:_ `"PoW"` | Yes |
| today_transaction_count | integer | _Example:_ `1928493` | Yes |
| address_count | integer | _Example:_ `192849345` | Yes |
| today_address_count | integer | _Example:_ `1928493` | Yes |
| total_value_locked | integer | _Example:_ `192849308903` | Yes |

#### Metadata

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string (uuid) | _Example:_ `"ethereum"` | Yes |
| blockchain_id | string (uuid) | _Example:_ `"ethereum"` | Yes |
| description | string | _Example:_ `"Ethereum is a decentralized platform that runs on the Ethereum blockchain."` | Yes |
| tagline | string | _Example:_ `"Decentralized, open source, community-driven platform for financial transactions."` | Yes |
| genesis_block | number | _Example:_ `10000000` | Yes |
| source | string | _Example:_ `"https://ethereum.org/"` | Yes |
| links | [ string ] |  | Yes |

#### Score

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| score | number | _Example:_ `46` | Yes |
| rank | string | _Example:_ `"B-"` | Yes |
| reliability | number | _Example:_ `100` | Yes |
| token_count | integer | _Example:_ `100` | Yes |
| power_consumption | number | _Example:_ `21` | Yes |
| proof_of_trust | number | _Example:_ `89` | Yes |
| community | number | _Example:_ `43` | Yes |

#### ChartPoint

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| date | number | _Example:_ `1847394837` | Yes |
| value | number | _Example:_ `1888000000` | Yes |
