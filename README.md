![blockmetrics](/assets/bm_logo_grand_bleu.png#gh-dark-mode-only)![blockmetrics](/assets/bm_logo_grand_bleu_light.png#gh-light-mode-only)
# Blockmetrics mono repo :package:

![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat&logo=github)
![Linters](https://github.com/JeremyTheintz/blockmetrics/actions/workflows/linter.yml/badge.svg)
[![Website](https://img.shields.io/website?down_message=down&label=Blockmetrics&style=flat&up_color=green&up_message=up&url=https%3A%2F%2Fblock-metrics.io)](https://block-metrics.io/)
![GitHub](https://img.shields.io/github/license/JeremyTheintz/blockmetrics)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/JeremyTheintz/blockmetrics)

Blockmetrics is a blockchain metrics platform that provides data on the blockchain ecosystem.

A tool to compare blockchains according to several parameters such as reliability, energy consumption, number of tokens and much more.

The main objective is to offer to everyone an easy way to understand what a blockchain is, what the implications of its use are and to be able to make a informed choice before using one blockcahin than another.

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

## Setup :hammer:

### 1. Clone the repo 
```
git clone https://github.com/JeremyTheintz/blockmetrics.git
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
> During the boot process, the Webscoket API, REST API and server will automatically reboot until the database has started

> The routine running at 02:00 CEST in production will run according to the following config in development environnement `rule.minute = [0, 10, 20, 30, 40, 50];`

> The routine running at 12:00 CEST in production is deactivated in development environnement to prevent fetch data when it is not published on the external API provider


### 4. Install frontend dependencies
```
cd frontend
npm install 
```

### 5. Start frontend
```
npm run dev
```
> Once it has started, go to http://localhost:8080

## Roadmap :sparkles:

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