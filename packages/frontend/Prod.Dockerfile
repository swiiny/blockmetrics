FROM node:16.13.0-alpine

ENV PORT 8080

RUN apk add --update npm

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY ./packages/frontend/package.json /app

RUN npm install 

# Copying source files
COPY ./packages/frontend /app

ENV NODE_ENV production

# Building app
RUN npm run build

EXPOSE 8080

# Running the app
CMD "npm" "run" "start"