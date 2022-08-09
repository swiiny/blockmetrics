# Blockmetrics mono repo

Blockmetrics is a blockchain metrics platform that provides data about the blockchain ecosystem.

A tool to compare blockchains according to several parameters such as reliability, energy consumption, number of tokens and much more.

The main objective is to offer to everyone an easy way to understand what a blockchain is, what the implications of its use are and to be able to make a conscious choice before using one blockcahin than another.

Visit [Blockmetrics](https://block-metrics.io/) to get more information about blockchains

## Services

- [Frontend](./packages/frontend/README.md)
- [REST API](./packages/api/rest/README.md)
- [Websocket API](./packages/api/ws/README.md)
- [Data server](./packages/server/README.md)

## Roadmap

- [ ] :sparkles: Integrate blockchains comparison with same transactions count per day
- [ ] :sparkles: Add comparison with real life data
- [ ] :heavy_plus_sign: Add Moonbeam blockchain
- [ ] :heavy_plus_sign: Add Arbitrum blockchain
- [ ] :heavy_plus_sign: Add Optimism blockchain

---

## TODO

### Global

- [ ] :white_check_mark: Add Cypress E2E tests
- [ ] :construction_worker: setup github actions to run tests before merge to production
- [ ] :art: Presentation

### Server

- [ ] :monocle_face: Fetch and put in blockchain table the testnet node count for PoS blockchains
- [ ] :adhesive_bandage: prevent bitcoin webscoket from disconnecting

### Frontend

- [ ] :bug: Fix Invalid date error on the chart tooltip
- [ ] :bug: Fix bug page not loading when go to a page then come back quickly
- [x] :iphone: Comparison page responsive
- [x] :iphone: Story page responsvive
- [ ] :wheelchair: Add accessibility
- [x] :lipstick: Fix unselect/select capitalize issue and UI
- [ ] :children_crossing: Explain engineering notation
- [x] :children_crossing: Add story page on the 404 page
- [x] :children_crossing: Comparison page display ranking
- [ ] :children_crossing: Show each monday on the abscissa the date of the week
- [x] :children_crossing: Check to restructure blockchain cards to highlight more the ranking
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
