FROM node:16.9.1-alpine

WORKDIR /app

COPY ./packages/server .

RUN npm install

CMD ["npm", "run", "start"]
