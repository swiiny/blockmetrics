FROM node:16.9.1-alpine

ARG WS_PORT

WORKDIR /app

COPY ./packages/api/ws .

RUN npm install

EXPOSE ${WS_PORT}

CMD ["npm", "run", "start"]