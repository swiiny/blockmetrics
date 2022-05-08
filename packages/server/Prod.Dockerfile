FROM node:16.9.1

RUN apk add --update npm

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]