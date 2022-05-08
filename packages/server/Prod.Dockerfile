FROM node:16.9.1-alpine

ARG SERVER_PORT

WORKDIR /app

ENV PORT=$SERVER_PORT

COPY ./packages/server .

RUN npm install

EXPOSE ${SERVER_PORT}

CMD ["SERVER_PORT=${SERVER_PORT} npm run start"]