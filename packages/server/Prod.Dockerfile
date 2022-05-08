FROM node:16.9.1-alpine

ARG SERVER_PORT

WORKDIR /app

COPY ./packages/server .

RUN npm install

EXPOSE ${SERVER_PORT}

ENV SERVER_PORT ${SERVER_PORT}

CMD ["npm", "run", "start"]