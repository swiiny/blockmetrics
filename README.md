# Blockmetrics mono repo :package:

Blockmetrics is a blockchain metrics platform that provides data about the blockchain ecosystem.

A tool to compare blockchains according to several parameters such as reliability, energy consumption, number of tokens and much more.

The main objective is to offer to everyone an easy way to understand what a blockchain is, what the implications of its use are and to be able to make a conscious choice before using one blockcahin than another.

Visit [Blockmetrics](https://block-metrics.io/) to get more information about blockchains

## Services

- [Frontend](./packages/frontend/README.md)
- [REST API](./packages/api/rest/README.md)
- [Websocket API](./packages/api/ws/README.md)
- [Data server](./packages/server/README.md)

## Working configuration :white_check_mark:
- Docker engine v20.10.17
- Docker compose v2.6.1
- Node v16.13.1
- Npm v8.13.2

## Setup : hammer:

### 1. Clone the repo 
```
git clone https://github.com/JeremyTheintz/block-metrics.git
cd block-metrics/packages
```

### 2. Environnement variables
```
cp .env.example .env
```
> Fill the new .env file with your local variables

### 3. Build and run the database, the server and the APIs using `docker-compose`
```
docker-compose up --build -V
```
> The routine running at 02:00 CEST in production will run according to the following config in development environnement `rule.minute = [0, 10, 20, 30, 40, 50];`

> The routine running at 12:00 CEST in production will run according to rhw following config in development environnement `rule.minute = [5, 15, 25, 35, 45, 55];`

### 4. Install frontend dependencies
```
cd frontend
npm install 
```

### 5. Start frontend
```
npm run dev
```


## Roadmap

- [ ] :sparkles: Integrate blockchains comparison with same transactions count per day
- [ ] :sparkles: Add comparison with real life data
- [ ] :sparkles: Add button to add blockchain to MetaMask
- [ ] :heavy_plus_sign: Add Moonbeam blockchain
- [ ] :heavy_plus_sign: Add Arbitrum blockchain
- [ ] :heavy_plus_sign: Add Optimism blockchain

---

## TODO

### Global

- [ ] :white_check_mark: Add Cypress E2E tests
- [ ] :construction_worker: setup github actions to run tests before merge to production

### Server

- [ ] :monocle_face: Fetch and put in blockchain table the testnet node count for PoS blockchains

### Frontend

- [ ] Add warning icon when data looks not up to date
- [ ] :wheelchair: Add accessibility
- [ ] :children_crossing: Explain engineering notation
- [ ] :children_crossing: Explain why the weight of each property from ranking system
- [ ] :children_crossing: check if trendline can be displayed on bar chart

### Integrated Blockchains

- [x] Ethereum
- [x] Binance Smart Chain
- [x] Polygon
- [x] Avalanche
- [x] Bitcoin
- [x] Fantom
- [ ] Moonbeam :pushpin: (https://moonscan.io/charts)
- [ ] Arbitrum :pushpin: (https://arbiscan.io/charts)
- [ ] Optimism :pushpin: (https://optimistic.etherscan.io/charts)
- [ ] Nervos :pushpin: (https://explorer.nervos.org/charts)
- [ ] Near :pushpin: :triangular_flag_on_post: (https://nearblocks.io/charts/txns)
- [ ] Celo
- [ ] Gnosis
- [ ] Solana
- [ ] Harmony

#### Webhook to deploy an updated image from dockerhub to jelastic cloud

`https://app.jpc.infomaniak.com/1.0/environment/control/rest/redeploycontainerbyid?envName=block-metrics&session=[ACCESS_TOKEN]&tag=latest&nodeId=[NODE_ID]&useExistingVolumes=true`
