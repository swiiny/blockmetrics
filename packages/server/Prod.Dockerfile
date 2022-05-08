FROM node:16.9.1-alpine

WORKDIR /app

COPY . .
COPY ./package.json ./app

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]