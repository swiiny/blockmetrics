FROM node:16.9.1-alpine

ARG API_PORT

WORKDIR /app

COPY ./packages/api/rest .

RUN npm install

EXPOSE ${API_PORT}

CMD ["npm", "run", "start"]