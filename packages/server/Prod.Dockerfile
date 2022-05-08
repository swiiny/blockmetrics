FROM node:16.9.1-alpine

WORKDIR /app

RUN /test.sh

COPY ./packages/server .

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]