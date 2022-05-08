FROM node:16.9.1

RUN npm install

EXPOSE $PORT

CMD ["npm", "run", "start"]