FROM node:16.9.1

RUN apk add --update npm

RUN mkdir -p /server/app/
WORKDIR /server/app

COPY package.json /server/app

RUN npm install

COPY . /server/app

EXPOSE $PORT

CMD ["npm", "run", "start"]