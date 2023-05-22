FROM node:18.7.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install express
RUN npm install nedb
RUN npm install path
RUN npm install ip

COPY . .

EXPOSE 3002

CMD ["node", "app.js"]