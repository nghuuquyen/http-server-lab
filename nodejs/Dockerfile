FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./ /usr/src/app

EXPOSE 3000

CMD ["node", "sample-app-server.js"]