FROM node:16.9.1-alpine

WORKDIR /app

#COPY ./packages/server .
RUN echo "working well"

COPY . .

RUN sh test.sh

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]