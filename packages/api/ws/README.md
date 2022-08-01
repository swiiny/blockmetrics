# Blockmetrics Websocket API
## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Subscriptions](#subscriptions)

## Introduction
This Service is used to stream to the [frontend](../../frontend/README.md)

## Technologies
The service work with:
- Ws: 8.6.0

## Subscriptions
- [How it works](#how-it-works)
- [Channels](#channels)

### How it works
The subscribe/unsubscribe messages should be built according to the following structure and be stringified before beeing sent.
```
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
##### Answer