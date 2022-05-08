FROM node:16.9.1

WORKDIR /app

COPY ./ /app

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]