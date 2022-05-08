FROM node:16.9.1-alpine

WORKDIR /app


COPY ./packages/server .

RUN /test.sh

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]