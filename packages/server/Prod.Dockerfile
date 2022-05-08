FROM node:16.9.1-alpine

WORKDIR /app/

COPY package.json /app/

RUN npm install

COPY . /app/

EXPOSE $PORT

CMD ["npm", "run", "start"]