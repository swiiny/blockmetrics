# Block metrics

The best place to get data about blockchain and a tool to compare them according to several parameters such as reliability, energy consumption, number of tokens and much more.

The main objective is to offer everyone an easy way to understand what a blockchain is, what the implications of its use are and to be able to make a conscious choice before using one blockcahin than another.

## TODO

### Global :white_check_mark:

-   [x] Buy block-metrics domain name

### UI/UX

-   [ ] Create awesome UI :construction:
-   [ ] Improve UX

### Before start development :white_check_mark:

-   [x] Setup file structure
-   [x] Create Dockerfiles
    -   [x] Database
    -   [x] Server
    -   [x] API
    -   [x] Frontend
-   [x] Setup docker-compose file

### Database :white_check_mark:

-   [x] Create schema using MySQLWorkbench
-   [x] Export SQL
-   [x] Import SQL into the database

### Server

-   [x] Init server.js file
-   [ ] Fetch blockchains data and fill the db with :construction:
-   [ ] Fetch and put in blockchain table the testnet node count for PoS blockchains
-   [ ] Setup data update cycle
-   [ ] fetch new blocks with Websockets API (only when all the db is update with all blocks data)

### API - REST

-   [x] Add CORS policies
-   [x] Add Rate limiter
-   [ ] Create Endpoints

### API - Websocket

-   [x] Set up WS Server

### Frontend

-   [ ] Create awesome theme based on UI/UX
-   [ ] API Hook
-   [ ] Homepage
-   [ ] Blockchains
    -   [ ] Index
    -   [ ] Single blockchain page
-   [ ] Compare
-   [ ] About us

### DevOps

-   [x] Setup DockerHub account
-   [x] Setup Jelastic server
-   [x] Setup Database
-   [ ] Create CI/CD scripts

### Integrated Blockchains

-   [x] Ethereum
-   [x] Binance Smart Chain
-   [x] Polygon
-   [x] Avalanche
-   [x] Bitcoin
-   [ ] Fantom
-   [ ] Solana
-   [ ] Celo
-   [ ] Harmony
-   [ ] Gnosis
-   [ ] Arbitrum
-   [ ] Moonbeam

#### Webhook to deploy an updated image from dockerhub to jelastic cloud

`https://app.jpc.infomaniak.com/1.0/environment/control/rest/redeploycontainerbyid?envName=block-metrics&session=[ACCESS_TOKEN]&tag=latest&nodeId=[NODE_ID]&useExistingVolumes=true`
