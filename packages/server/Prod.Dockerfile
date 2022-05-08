FROM node:16.9.1-alpine

WORKDIR /app

RUN /test.sh

COPY ./package*.json ./app

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start"]