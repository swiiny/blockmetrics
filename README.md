# Block metrics

The best place to get data about blockchain and a tool to compare them according to several parameters such as reliability, energy consumption, number of tokens and much more.

The main objective is to offer everyone an easy way to understand what a blockchain is, what the implications of its use are and to be able to make a conscious choice before using one blockcahin than another.

## TODO

### Global :white_check_mark:

-   [x] Buy block-metrics domain name
-   [x] Buy blockmetrics.eth
-   [ ] setup jelatic https for APIs
-   [ ] Create readme for each service
-   [ ] Update this readme with link to others

### Database :white_check_mark:

-   [ ] add TVL in blockchain table
-   [ ] Create daily_blockchain_power_consumption_history table

### Server

-   [ ] fetch PoW blockchains power consumption
-   [ ] Fetch and put in blockchain table the testnet node count for PoS blockchains
-   [ ] prevent bitcoin webscoket from disconnecting

### API - REST :white_check_mark:

-   [ ] separate endpoints in multiple files

### API - Websocket

-   [x] Set up WS Server
-   [ ] set up single blockchain websocket connection

### Frontend

-   [ ] Homepage
-   [ ] Blockchains
    -   [ ] Index
    -   [ ] Single blockchain page
-   [ ] Compare
-   [ ] About us

### Integrated Blockchains

-   [x] Ethereum
-   [x] Binance Smart Chain
-   [x] Polygon
-   [x] Avalanche
-   [x] Bitcoin
-   [x] Fantom
-   [ ] Solana
-   [ ] Celo
-   [ ] Harmony
-   [ ] Gnosis
-   [ ] Arbitrum
-   [ ] Moonbeam

#### Webhook to deploy an updated image from dockerhub to jelastic cloud

`https://app.jpc.infomaniak.com/1.0/environment/control/rest/redeploycontainerbyid?envName=block-metrics&session=[ACCESS_TOKEN]&tag=latest&nodeId=[NODE_ID]&useExistingVolumes=true`
