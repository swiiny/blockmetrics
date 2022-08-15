FROM node:14.11-alpine

WORKDIR /app

COPY package.json ./
COPY next.config.js ./

RUN apk --no-cache --virtual build-dependencies add \
        python \
        make \
        g++

RUN npm install
